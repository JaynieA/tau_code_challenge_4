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
router.post('/', function(req, res) {
  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      console.log(err);
    } else {
      console.log('connected to db');
      //unpack values from req.body
      var name = req.body.name;
      var description = req.body.description;
      var pic = req.body.pic;
      var query = client.query('INSERT INTO treats (name, description, pic) VALUES ($1, $2, $3)', [name, description, pic]);
      query.on('end', function() {
        res.sendStatus(201);
      }); // end query on
    } // end else
  }); // end pg connect
}); // end post

// PUT /treats/<id>

// DELETE /treats/<id>

/** ---- DO NOT MODIFY BELOW ---- **/
module.exports = router;
