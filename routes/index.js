var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Welcome to Tweets Search Engine' });
});
/*Get visual page*/
router.get('/visual', function(req, res, next) {
  res.render('visual', { title: 'Visual Data representation' });
});
/* Get about page*/
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About the project' });
});

/* GET Userlist page. */
var global2;
router.post('/userlist', function(req, res) {
    var db = req.db;/*set to our internal db*/
     var userName = req.body.username;
     global2=userName;
    var collection = db.get('data');
    console.log(global2);
    console.log("We are retrieving data from the database and displaying the list for the query");
    collection.find({'text' : new RegExp(userName,"i")},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs, global2
        });
    });
});
/* Renders users information form */
var global;
router.get('/comments/:id', function(req, res) {
     var db =req.db;
    console.log("Fetching data based on the id");
     var collection =db.get('data');
     var userID=parseInt(req.params.id);
     global=userID;
     console.log(userID);
    collection.find({'id': userID},function(e,docs){
        console.log(docs.length);
        res.render('comments', { "title": "User Information" , "docs" : docs, global2 });
     });
});
/* POST to Add User Comment */
router.post('/comments', function(req, res) {

    // Set our internal DB variable
    var db = req.db;
    console.log("Posting comment to particular ID");

    // Set our collection
    var collection = db.get('data');
    var userID = parseInt(global);
    var userComment=req.body.Comment;
    console.log(userID + "  " + userComment);

    var query={"id":userID};
    var query1={"$set":{"comment":userComment}};

    console.log("we are here 0");

    

    // Submit to the DB
    collection.update(query,query1, false, false, function(err){
        res.redirect("/comments/"+userID);
    });
       res.redirect("/comments/"+userID); 
    });


module.exports = router;
