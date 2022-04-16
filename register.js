
const env = require('./env'); 
const express = require('express'); //serve files to front end
const morgan = require("morgan"); //log request made to backend
const { Prohairesis } = require("prohairesis"); //for mysql
const bodyParser = require("body-parser"); //allows to interpret as json

const app = express(); 
app.use("/assets", express.static("assets"));
const port = process.env.PORT || 4000;
const mySQLstring = 'mysql://b485d7053c318c:8dcd5143@eu-cdbr-west-02.cleardb.net/heroku_9c5fd54c0bf4617?reconnect=true'
const database = new Prohairesis(mySQLstring)

app.get("/", function(req,res){
    res.sendFile(__dirname + "/login.html");
})

app
    .use(express.static('public'))
    .use(morgan('dev'))
    .use(bodyParser.urlencoded({ extended: false}))
    .use(bodyParser.json())

    //insert new user into table
    .post('/', async (req, res) => {
        await database.execute(
            'INSERT INTO register_user (Username, Email, UserPassword) VALUES (@username, @email, @password)',
            {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
            });

        res.json('Added user successfully');
    })
    
    .listen(port, () => console.log(`Server listening on port ${env.port}`));