var express = require('express');
var mysql = require('mysql');
var app = express();
var bodyParser = require('body-parser');
var querystring = require('querystring');  

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
          res.json({"error":"error"})
        }
        else{
          res.json(rows)
        }
      });
    }
  )

  app.get('/id',function(req,res){
    id = req.query.id
    conn.query("SELECT * FROM companies WHERE id="+id, function(error, rows, fields){
      if(!!error){
        res.json({"error":"error"})
      }
      else{
        res.json(rows)
      }
    });
  }
)


var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.post('/add',urlencodedParser,function(req,res){

  var details = [
    [req.body.name, req.body.type] 
  ]

  conn.query("INSERT INTO companies(name, type) VALUES (?)",details, function(error, rows, fields){
    if(!!error){
      const query = querystring.stringify({
        "response":"error"
    });
      return res.redirect('http://localhost:3000/home/admin'+query);
    }
    else{
      const query = querystring.stringify({
        "response":"success"
    });
      return res.redirect('http://localhost:3000/home/admin?'+query);
    }
  });
}
)

app.get('/delete/',function(req,res){
  id = req.query.id
  conn.query("DELETE FROM companies WHERE id="+id, function(error, rows, fields){
    if(!!error){
      const query = querystring.stringify({
        "response":"error"
    });
      return res.redirect('http://localhost:3000/home/admin?'+query);
    }
    else{
      const query = querystring.stringify({
        "response":"success"
    });
      return res.redirect('http://localhost:3000/home/admin?'+query);
    }
  });
}
)

app.post('/edit',urlencodedParser,function(req,res){
  var id = req.body.id
  var details = [
    req.body.name, req.body.type,id
  ]
  conn.query('UPDATE companies SET name=?, type=? WHERE id =?',details, function(error, rows, fields){
    if(!!error){
      const query = querystring.stringify({
        "response":"error"
    });
    console.log(error)
      return res.redirect('http://localhost:3000/home/admin?'+query);
    }
    else{
      const query = querystring.stringify({
        "response":"success"
    });
      return res.redirect('http://localhost:3000/home/admin?'+query);
    }
  });
}
)

  app.listen(5000);