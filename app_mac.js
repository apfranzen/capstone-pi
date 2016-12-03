var express = require('express');
var app = express();
var axios = require('axios');
var chokidar = require('chokidar');

app.get('/', function (req, res) {
  axios.get('http://res.cloudinary.com/apfranzen/image/list/photon.json')
  .then((response) => {
    console.log(response);
    res.status(200).json({
      status: 'success',
      data: response.data
    });
  })
  .catch(function (error) {
    console.log(error);
  });
});

  // Initialize watcher.
  var watcher = chokidar.watch('.pics', {
    ignored: /[\/\\]\./,
    persistent: true
  });

  // Something to use when events are received.
  var log = console.log.bind(console);
  // Add event listeners.
  watcher
    .on('add', path => log(`File ${path} has been added`))
    .on('change', path => log(`File ${path} has been changed`))
    .on('unlink', path => log(`File ${path} has been removed`));
})

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
