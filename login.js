const mysql = require("mysql");
const express = require("express");

const app = express();
app.use("/assets", express.static("assets"));

const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    //password: ".....",
    database: "nodejs"
});

//connect to the database
connection.connect(function(error){
    if(error) throw error
        else console.log("database connection successful")
})

app.get("/", function(req,res){
    res.sendFile(__dirname + "/login.html");
})


app.post("/", encoder, function(req, res){
    var username = req.body.username;
    var password = req.body.password;

    connection.query("select * from loginuser where user_name = ? and user_pass = ?", [username,password], function(error, results, fields){
        if(results.length > 0){
            res.redirect("/index");
        }else{
            res.redirect("/");
        }
        res.end();
    })
})

//login is successful
app.get("/index", function(req,res){
    res.sendFile(__dirname + "/index.html")
})

//set app port
app.listen(4100);