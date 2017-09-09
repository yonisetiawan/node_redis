var express = require('express');
var router = express.Router();
var redis = require('redis');
var axios = require('axios')
var client = redis.createClient();

/* GET home page. */
router.get('/', function(req, res, next) {
  client.get('berita', function(err, reply) {
    if (reply) {
      res.render('index', {
        title: reply
      });
    } else {
      axios.get('https://api.kumparan.com/v1.0/stories')
        .then(function(response) {
          client.set('berita', response.data.results[3].title, function(err, reply) {
            res.render('index', {
              title: 'Set Redis'
            });
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  });
});

module.exports = router;
