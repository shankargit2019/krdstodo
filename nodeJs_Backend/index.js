const mysql=require('mysql');
var cors = require('cors');
const express = require('express');
const http = require('http');
var app=express();
var router = express.Router();
app.use('/', router);

router.use(function(req, res, next) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
      res.setHeader('Access-Control-Allow-Credentials', true);
      res.setHeader('Content-Type', 'application/json');
      next();
});

var bodyParser=require('body-parser');
app.use(bodyParser.json());

var mysqlConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'api_db'
});

mysqlConnection.connect((err) => {
  if(!err)
    console.log('DB Connection success');
  else
    console.log('DB Connection Failed'+JSON.stringify(err, undefined,2));
});

app.listen(3000,() => console.log('Express server is running at port no : 3000'));

//Get all todo tasks
router.get('/todo', cors(), function(req, res, next) {
  const strQuery = 'SELECT * FROM todoTbl';
  mysqlConnection.query(strQuery, function(err, rows,fields) {
    if(!err)    res.send(rows);   // res.render('todo', { name: 'test', info: 'test info' });
    else       console.log(err);
  });
});

//Get one todo task
router.get('/todo/:id', function(req, res, next) {
  const strQuery='SELECT * FROM todoTbl WHERE todoId = ?';
  mysqlConnection.query(strQuery, [req.params.id], function(err, rows) {
    if(!err)
    res.send(rows);
    else
      console.log(err);
  });
});

//delete one todo task
router.delete('/todo/del/:id', function(req, res, next) {  
  const strQuery='DELETE FROM todoTbl WHERE todoId = ?';
  const strSelectQuery = 'SELECT * FROM todoTbl';
  mysqlConnection.query(strQuery, [req.params.id], function(err, rows) {
    if(!err){             
        mysqlConnection.query(strSelectQuery, [req.params.id], function(err, rows) {
          if(!err)
          res.send(rows);
          else
            console.log(err);
        });
    } else {
      console.log(err);
    }      
  });
});

//insert one todo task
app.post('/todo/add', function(req, res, next) {
    //return res.send(req.body);
    if (!req.body) return res.sendStatus(400);
    const todoTxt = req.body.todoTxt;
    const strQuery=`INSERT INTO todoTbl(todoTxt) VALUES ('${todoTxt}')`;
    const strSelectQuery = 'SELECT * FROM todoTbl';
    mysqlConnection.query(strQuery, [], function(err, rows) {
      if(!err) {
        mysqlConnection.query(strSelectQuery, [req.params.id], function(err, rows) {
          if(!err)
          res.send(rows);
          else
            console.log(err);
        });
      } else {
          console.log(err);
      }
    });
});

//insert logged user
app.post('/todo/addSocialUser', function(req, res, next) {   
  if (!req.body) return res.sendStatus(400);
  const tokenId = req.body.todoTxt.token;
  const emailId = req.body.todoTxt.email;
  const name = req.body.todoTxt.name;
  const userLogged = 1;
  
  const strQuery=`INSERT INTO todoUsers(tokenId, emailId, name,userLogged) VALUES ('${tokenId}','${emailId}','${name}','${userLogged}')`;  
  mysqlConnection.query(strQuery, [], function(err, rows) {
    if(!err) {
      res.send(rows);
    } else {
      console.log(err);
    }
  });
});

app.put('/todo/update', function(req, res, next) {
  if (!req.body) return res.sendStatus(400);
  const todoId = req.body.todoId;
  const todoIsDone = req.body.todoIsDone;
  const strQuery=`UPDATE todoTbl SET todo_isDone = '${todoIsDone}' WHERE todoId='${todoId}'`;
  const strSelectQuery = 'SELECT * FROM todoTbl';
  mysqlConnection.query(strQuery, [], function(err, rows) {
    if(!err) {
      mysqlConnection.query(strSelectQuery, [req.params.id], function(err, rows) {
        if(!err)
        res.send(rows);
        else
          console.log(err);
      });
    } else {
        console.log(err);
    }
  });
});
