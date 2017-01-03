var router = require('express').Router(); // DO NOT MODIFY
var pg = require('pg'); // DO NOT MODIFY

var  connectionString = 'postgres://localhost:5432/treatDB'; // database name treatDB

// GET /treats
router.get('/', function (req, res) {
  var treats = [];
  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      console.log('Error connecting to the DB', err);
      res.sendStatus(500);
      done();
      return;
      /** ---- YOUR CODE BELOW ---- **/
      // Add pg and pSQL code here to get treats from the treatDB
    } else {
      var query = client.query('SELECT * FROM treats');
      query.on('row', function(row) {
        treats.push(row);
      }); // on query
      query.on('end', function() {
        done();
        res.send(treats);
      }); // end query
    } // end else
  });
});

/** ---- YOUR CODE BELOW ---- **/

// POST /treats

// PUT /treats/<id>

// DELETE /treats/<id>

/** ---- DO NOT MODIFY BELOW ---- **/
module.exports = router;
