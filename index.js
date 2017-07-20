var express = require('express')
var path = require('path')

var app = express()
var server = require('http').Server(app)
 

 
//app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
    console.log('Root requested');
    console.log('Get file at ' +  path.join(__dirname, 'public/index.html'));

    res.sendFile(path.join(__dirname, 'public/index.html'));
});

server.listen(process.env.PORT || 3000, error => {
    if (error)
    {
        console.log('Server error: ' + error);
    }

    console.log('Server started');
})