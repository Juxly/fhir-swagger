var Converter = require('./lib/conformance-to-swagger.js');

module.exports = function (options, callback) {
  callback = callback || function (err) { if (err) throw err; };
  options.getConformance(function (err, conf) {
    if (err) return callback(err);
    var swagger = Converter.convert(options.base_url, conf);
    if (options.authorization) {
      swagger.securityDefinitions = swagger.securityDefinitions || {};
      swagger.securityDefinitions.Basic = { type: 'basic' };
    }
    callback(null, swagger);
  });
};
