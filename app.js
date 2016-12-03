var express = require('express');
var app = express();
var axios = require('axios');

app.get('/', function (req, res) {
  axios.get('http://res.cloudinary.com/apfranzen/image/list/photon.json')
  .then((response) => {
    res.send(response);
  })
  .catch(function (error) {
    console.log(error);
  });
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
