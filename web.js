var express = require('express')
var app = express()
app.use(express.logger())
app.use(express.bodyParser())
app.set('views', __dirname + '/')
app.engine('html', require('ejs').renderFile)

app.get('/', function(req, res) {
  res.render('index.html')
})

app.post('/noBeer', function(req, res) {
  console.log('No beer', req.body)
  res.end()
})

var port = process.env.PORT || 5000
app.listen(port, function() {
  console.log("Listening on " + port)
});
