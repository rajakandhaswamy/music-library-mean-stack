var express = require('express');
var app = express();
var mongo = require('mongojs');
var db = mongo('MusicLibrary', ['MusicLibrary']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/MusicLibrary', function(req, res) {
    console.log("I received a get Request");
    db.MusicLibrary.find(function(err, docs) {
        res.json(docs);
    });

});

app.post('/MusicLibrary', function(req, res) {
    console.log(req.body);
    db.MusicLibrary.insert(req.body, function(err, docs) {
        res.json(docs);
    });
});


app.delete('/MusicLibrary/:id', function(req, res) {
    var id = req.params.id;
    console.log(id);
    db.MusicLibrary.remove({
        _id: mongo.ObjectId(id)
    }, function(err, docs) {
        res.json(docs);
    });
});

app.get('/MusicLibrary/:id', function(req, res) {
    var id = req.params.id;
    console.log(id);
    db.MusicLibrary.findOne({
        _id: mongo.ObjectId(id)
    }, function(err, docs) {
        console.log(docs);
        res.json(docs);            
    });
});

app.put('/MusicLibrary/:id', function(req, res) {
    var id = req.params.id;
    console.log(req.body.Album);
    db.MusicLibrary.findAndModify({
        query: {
            _id: mongo.ObjectId(id)
        },
        update: {
            $set: {
                Album: req.body.Album,
                Artist: req.body.Artist,
                Song: req.body.Song
            }
        },
        new: true
    }, function(err, docs) {
        res.json(docs);
    });
});


app.listen(3000);
console.log("Server Running on port 3000");