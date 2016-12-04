var chokidar = require('chokidar');
var rp = require('request-promise');

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
        console.log(findpayload);
      })
      .catch(function (err) {
        console.log('err: ', err);
      })
  })
  // .on('add', path => log(`File ${path} has been added`))
  .on('add', path => log(`File ${path} has been added`))
  .on('change', path => log(`File ${path} has been changed`))
  .on('unlink', path => log(`File ${path} has been removed`));
