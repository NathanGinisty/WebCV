// https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe

// launch from VSC terminal: Node API\server.js
// Ctrl+C in the terminal to kill server

// REST API demo in Node.js
var express = require('express'); // require the express framework
var app = express();
var fs = require('fs'); //require file system object
var cors = require('cors')

app.use(cors());

// Create a server to listen at port 3000 
var server = app.listen(3000, function(){
    var host = server.address().address
    var port = server.address().port
    console.log("API listening at http://%s:%s", host, port)
})


// --------------------------------------------------- //

// http://localhost:3000/getUsers
app.get('/getUsers', function(req, res){
    fs.readFile(__dirname + "/users.json", 'utf8', function(err, data){
        console.log(data);
        res.end(data); // you can also use res.send()
    });
})

app.get('/getUsers/:id', function (req, res) {
    
    console.log("yooooooooooooo");
    
    // First retrieve existing user list
    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
        var users = JSON.parse( data );
        var user = users["user" + req.params.id] 
        console.log( user );
        res.end( JSON.stringify(user));
    });
})

// --------------------------------------------------- //


