var chokidar = require('chokidar');

// Initialize watcher.
var watcher = chokidar.watch('./pics', {
  ignored: /[\/\\]\./,
  persistent: true
});

// Something to use when events are received.
var log = console.log.bind(console);
// Add event listeners.
watcher
  // .on('add', path => {
  //   console.log();
  // }
  .on('add', path => log(`File ${path} has been added`))
  .on('add', path => log(`File ${path} has been added`))
  .on('change', path => log(`File ${path} has been changed`))
  .on('unlink', path => log(`File ${path} has been removed`));
