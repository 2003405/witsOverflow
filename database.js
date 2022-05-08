var mysql = require('mysql');
var conn = mysql.createConnection({
    host: "eu-cdbr-west-02.cleardb.net",
    user: "b485d7053c318c",
    password: "8dcd5143",
    database: "heroku_9c5fd54c0bf4617"
}); 
conn.connect(function(err) {
  if (err) throw err;
  console.log('Database is connected successfully !');
});
module.exports = conn;