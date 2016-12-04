var chokidar = require('chokidar');
var rp = require('request-promise');
var cloudinary = require('cloudinary');

// Cloudinary Config

// Initialize watcher.
var matchers = [
  '*.bts'
]


var watcher = chokidar.watch('./pictures/*.jpg', {
  ignoreInitial: true,
  persistent: true,
  ignored: /[\/\\]\./
});

// Something to use when events are received.
var log = console.log.bind(console);
// Add event listeners.
watcher
  .on('add', path => {
    console.log(path);
    var options = {
      uri: 'https://ml.internalpositioning.com/location?group=precisepointer&user=yolo'
    };

    rp(options)
      .then(function (findpayload) {
        var payload = JSON.parse(findpayload);
        var location = payload.users.yolo[0].location;
        console.log(payload.users.yolo[0].location);

        console.log('path: ', path);
        // upload picture to cloudinary
        cloudinary.v2.uploader.upload(path,
        { context:
          { project: 'galvanize',
           room: location,
          },
          use_filename: true,
          folder: 'galvanize',
          image_metadata: true
         },
        function(error, result) {
          console.log('cloudinary result: ', result);
          if(error){
            console.log('cloudinary error: ', error);
          }
        });
      })
      .catch(function (err) {
        console.log('err: ', err);
      })
  })
