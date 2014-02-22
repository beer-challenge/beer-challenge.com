var express = require('express')
var app = express()
app.use(express.logger())
app.use(express.bodyParser())
app.set('views', __dirname + '/')
app.engine('html', require('ejs').renderFile)

app.get('/', function(req, res) {
  res.render('index.html')
})

app.get('/nexus', function(req, res) {
  var file = __dirname + '/BeerChallenge.apk'
  res.download(file)
})

app.post('/noBeer', function(req, res) {
  console.log('No beer', req.body)
  res.end()
})

var mongo = require('mongodb')
var mongoUri = process.env.MONGOHQ_URL

app.post('/contact', function(req, res) {
  mongo.Db.connect(mongoUri, function(err, db) {
    if (err)
      res.send(530)
    else
      db.collection('contact', function(errr, collection) {
        if (errr)
          res.send(531)
        else
          collection.insert({email: req.body['email']}, {safe: true}, function(errrr, rs) {
            if (errrr)
              res.send(532)
            else
              res.send(204)
          })
      })
  })
})

var port = process.env.PORT || 5000
app.listen(port, function() {
  console.log("Listening on " + port)
})
