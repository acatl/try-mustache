(function() {
  var app, express, http, path;

  express = require("express");

  path = require("path");

  http = require("http");

  app = express();

  app.configure(function() {
    app.set("port", process.env.PORT || 3000);
    app.use(express.logger("dev"));
    app.use(express.bodyParser());
    console.log(__dirname);
    return app.use(express["static"](path.join(__dirname, "/public")));
  });

  http.createServer(app).listen(app.get('port'), function() {
    return console.log("Express server listening on port " + app.get('port'));
  });

}).call(this);
