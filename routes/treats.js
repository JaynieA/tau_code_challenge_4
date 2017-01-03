var router = require('express').Router(); // DO NOT MODIFY
var pg = require('pg'); // DO NOT MODIFY

var  connectionString = 'postgres://localhost:5432/treatDB'; // database name treatDB

// GET /treats
router.get('/', function (req, res) {
  var q = req.query.q;
  var queryString = '';
  if (q != undefined) {
    queryString = "SELECT * FROM treats WHERE name LIKE '%Cupc%'";
    console.log(queryString);
  } else {
    queryString = 'SELECT * FROM treats'
  } // end else
  console.log(q);
  var treats = [];
  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      console.log('Error connecting to the DB', err);
      res.sendStatus(500);
      done();
      return;
    } else {
      var query = client.query(queryString);
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
      var query = client.query('INSERT INTO treats (name, description, pic) VALUES ($1, $2, $3)', [name, description, pic], function(err, response) {
        if (err) {
          console.log(err);
          res.sendStatus(500);
        } else {
          res.sendStatus(201);
        } // end else
      }); // end query
    } // end else
  }); // end pg connect
}); // end post

// PUT /treats/<id>
router.put('/:id', function(req, res) {
  var id = req.params.id;
  console.log(id);
  //unpack request values
  var name = req.body.name;
  var description = req.body.description;
  var pic = req.body.pic;
  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      console.log(err);
    } else {
      var query = client.query('UPDATE treats SET name = $1, description = $2, pic = $3 WHERE id = $4', [name, description, pic, id], function(err, response) {
        if (err) {
          res.sendStatus(500);
        } else {
          res.sendStatus(201);
        } // end else
      }); // end query
    } // end else
  }); // end pg connect
}); // end put

// DELETE /treats/<id>
router.delete('/:id', function(req, res) {
  var id = req.params.id;
  console.log(id);
  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      console.log(err);
    } else {
      var query = client.query('DELETE FROM treats WHERE id = $1', [id], function(err, response) {
        if (err) {
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        } // end else
      }); // end query
    } // end else
  }); // end pg connect
}); // end put

/** ---- DO NOT MODIFY BELOW ---- **/
module.exports = router;
