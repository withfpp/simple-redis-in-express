var express = require('express');
var router = express.Router();
var redis = require("redis");
var client = redis.createClient();

/* GET home page. */
router.get('/', function(req, res, next) {
  var todos = [];
  client.hgetall("Todo", function(err, objs){
    for(var k in objs){
      var newTodo = { text: objs[k] };
      todos.push(newTodo);
    };
    res.render('index', {
      title: 'new todo list',
      todos: todos
    });
  });


});

router.post('/save', function(req, res, next){
  var newTodo = {};
  newTodo.name = req.body['todo-text'];
  newTodo.id = newTodo.name.replace(" ", "-");
  client.hset("Todo", newTodo.id, newTodo.name);
  res.redirect("/");
})

module.exports = router;
