var app = require('express')();
var convert = require('./index.js');
var LucyConsole = require('lucy-console');
var args = require('./options.js');
var swaggerUi = require('swagger-ui-express');

var swagger = null;
convert(args, function (err, s) {
  if (err) throw err;
  swagger = s;
  var portal = new LucyConsole({
    swagger: swagger,
    proxy: args.proxy_host || true,
    development: process.env.DEVELOPMENT,
  });
  app.use(portal.router);
  app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swagger));
});

app.use('/proxy', require('./proxy.js'));
app.listen(args.port || 3000);