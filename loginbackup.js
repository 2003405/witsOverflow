const env = require('./env');
const express = require('express');
const morgan = require("morgan"); 
const { Prohairesis } = require("prohairesis")
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();
const mysql = require("mysql");

const app = express(); 
app.use("/assets", express.static("assets"));
const port = process.env.PORT || 8080;
const mySQLstring = 'mysql://b485d7053c318c:8dcd5143@eu-cdbr-west-02.cleardb.net/heroku_9c5fd54c0bf4617?reconnect=true'
const database = new Prohairesis(mySQLstring)

const connection = mysql.createConnection({
    host: "eu-cdbr-west-02.cleardb.net",
    user: "b485d7053c318c",
    password: "8dcd5143",
    database: "heroku_9c5fd54c0bf4617"
});

//connect to the database
connection.connect(function(error){
    if(error) throw error
        else console.log("database connection successful")
})

app.get("/", function(req,res){
    res.sendFile(__dirname + "/login.html");
})

app
.post("/", encoder, function(req, res){
    var Username = req.body.Username;
    var UserPassword = req.body.UserPassword;

    connection.query("select * from register_user where Username = ? and UserPassword = ?", [Username,UserPassword], function(error, results, fields){
        if(results.length > 0){
            res.redirect("/index");
        }else{
            res.redirect("/");
        }
        res.end();
    })
})
.listen(port, () => console.log(`Server listening on port ${env.port}`));


//login is successful
app.get("/index", function(req,res){
    res.sendFile(__dirname + "/index.html")
})
