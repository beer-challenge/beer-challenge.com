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

app.post('/highscores', function(req, res) {
  console.log('Highscores', req.body)
  res.send({
    list: [
      { name: 'yue', time: '1.1' },
      { name: 'rgd', time: '1.2' },
      { name: 'lop', time: '2.0' },
      { name: 'xxx', time: '2.2' },
      { name: 'lui', time: '3.1' },
      { name: 'wer', time: '7.3' },
      { name: 'bvn', time: '12.1' },
      { name: 'iuo', time: '111.1' },
      { name: 'iop', time: '123.0' },
      { name: 'rte', time: '221.8' },
    ],
    type: '24h'
  })
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
