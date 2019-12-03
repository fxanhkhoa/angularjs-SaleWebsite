const express = require('express');

const app = express();
const jsonParser = require('body-parser').json();

//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://localhost:27017/';
var dbo;

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    dbo = db.db("IPSDB");
});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With');
    next();
});

port = 4200;

app.get('/',  (req, res) => res.send('Hello'));
app.post('/signin', jsonParser, (req, res) =>{
    // res.send({message: "OK"});
    query = {
        email: "",
        password: ""
    }
    query.email = req.body.email;
    query.password = req.body.password;
    console.log(query);
    dbo.collection("users").find(query).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});

app.post('/signup', jsonParser, (req, res) => {
    // res.send(req.body);
    console.log(req.body);
    dbo.collection("users").find(req.body).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        if (result === undefined || result.length == 0){
            var info = { 
                result: "success"
            };
            dbo.collection("users").insertOne(req.body, function(err, res) {
                if (err) throw err;
                console.log("1 document inserted");
            });
            res.send(info);
        }
        else{
            var info = { 
                result: "fail"
            };
            console.log("fail")
            res.send(info);
        }
    });
});

app.listen(port, () => console.log("Server is running at port", port));