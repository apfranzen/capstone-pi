var chokidar = require('chokidar');
var rp = require('request-promise');
var cloudinary = require('cloudinary');
var cloudAuth = require('./cloudinaryAuth.js');

var watcher = chokidar.watch('../data/syncaod/pics/*.jpg', {
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
          console.log('cloudinary public_id: ', result.public_id);
          console.log('cloudinary room: ', payload.users.yolo[0].location);
          console.log('cloudinary imageDirection: ', result.image_metadata.GPSImgDirection);
          // POST image data to server
            var postPic = {
              method:'POST',
              uri: 'http://10.2.12.202:3000/inbound/pic',
              body: {
                // room: payload.users.yolo[0].location,
                room: 'Classroom',
                orientation: result.image_metadata.GPSImgDirection,
                pic_url: result.public_id,
                project: 'Galvanize'
              },
              json: true
            };
          if(error){
            console.log('cloudinary error: ', error);
          }
        });
      })
      .catch(function (err) {
        console.log('err: ', err);
      })
  })
