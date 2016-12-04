var chokidar = require('chokidar');
var rp = require('request-promise');
var cloudinary = require('cloudinary');

// Initialize watcher.
var watcher = chokidar.watch('./pics', {
  ignored: /[\/\\]\./,
  persistent: true
});

// Something to use when events are received.
var log = console.log.bind(console);
// Add event listeners.
watcher
  .on('add', path => {
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
          console.log('cloudinary error: ', error);
        });
      })
      .catch(function (err) {
        console.log('err: ', err);
      })
  })
  // .on('add', path => log(`File ${path} has been added`))
  .on('add', path => log(`File ${path} has been added`))
  .on('change', path => log(`File ${path} has been changed`))
  .on('unlink', path => log(`File ${path} has been removed`));
