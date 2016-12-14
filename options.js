var args = require('yargs').argv;
var Request = require('request');

args = module.exports = JSON.parse(JSON.stringify(args));
args.output = args.output || './swagger.json';
args.base_url = args.base_url || 'http://include.a.baseurl/';

if (args.username) {
  args.authorization = {
    username: args.username,
    password: args.password,
  };
}
if (args.reject_unauthorized === 'false' || args.reject_unauthorized === '0') {
  args.reject_unauthorized = false;
}

args.getConformance = function (callback) {
  if (args.conf_url) {
    //if there's a url, load it in and convert to object
    var headers = { 'Accept': 'application/json' };
    var auth = args.authorization;
    if (auth) {
      var authString = auth.username + ':' + auth.password;
      authString = new Buffer(authString).toString('base64');
      headers.Authorization = 'Basic ' + authString;
    }

    Request({
      rejectUnauthorized: args.reject_unauthorized,
      url: args.conf_url,
      headers: headers,
      json: true,
    }, function (err, resp, body) {
      if (err)
        return callback(err);
      else {
        if (body && body.description && body.name)
          callback(null, body);
        else
          callback('Invalid conformance');
      }
    });
  } else if (args.conf_path) {
    //if there's a path, load it in and convert to object
  } else if (args.conf_obj) {
    //they already passed an object, yay
  }
  else {
    //nothing to work with, return error
    callback('Missing required options parameter. Please set url, path, or conformance option.');
  }

  // if (conf && conf.description && conf.name)
  //   callback(null, conf);
  // else
  //   callback('Invalid conformance');
};