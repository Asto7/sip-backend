var express = require('express');
var mysql = require('mysql');
var app = express();

var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "sip"
  });

  conn.connect(function(error) {
    if(!!error){
      console.log("error");
    }
    else{
      console.log("sucess");
    }
  });

  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
  
  app.get('/data',function(req,res){
      conn.query("SELECT * FROM companies", function(error, rows, fields){
        if(!!error){
          console.log("error");
          res.json({"error":"error"})
        }
        else{
          console.log("sucess");
          res.json(rows)
        }
      });
    }
  )

  app.listen(5000);