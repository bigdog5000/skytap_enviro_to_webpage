/*
* Module dependencies
*/

var express = require('express'),
  FileStreamRotator = require('file-stream-rotator'),
  stylus = require('stylus'),
  nib = require('nib'),
  fs = require('fs'),
  morgan = require('morgan'),
  Skytap = require('node-skytap');


  var app = express();
function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib());
}
var logDirectory = __dirname + '/log';


// create a rotating write stream
var accessLogStream = FileStreamRotator.getStream({
  filename: logDirectory + '/access-%DATE%.log',
  frequency: 'daily',
  verbose: false
});


//intialize skytap api session
var skytap = Skytap.init({
  username: sky_username,
  token: sky_token
});

var configID = skyConfigurationID;
var irEnvironment;

// Get a specific skytap environment
skytap.environments.get({ configuration_id: configID },function(err, data) {
  console.log(err || data);
  });


app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
// setup the logger
app.use(morgan('combined', {stream: accessLogStream}));
app.use(stylus.middleware(
  { src: __dirname + '/public',
  compile: compile
  }
));
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.render('index',
  { title : 'IR Skytap',
    irinfo : pc1 }
  );
});
app.listen(3000);
