express = require("express")
path = require("path")
http = require("http")

app = express()

app.configure ->
    app.set "port", process.env.PORT or 3000
    app.use express.logger("dev") # 'default', 'short', 'tiny', 'dev'
    app.use(express.bodyParser())
    console.log __dirname
    app.use(express.static(path.join(__dirname, "/public")))


http.createServer(app).listen app.get('port'), -> 
    console.log("Express server listening on port " + app.get('port'));
