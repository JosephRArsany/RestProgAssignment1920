/*const http = require('http');

const hostname = '127.0.0.1';
const port = 8080;

const server = http.createServer((req, res) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Hello World');
});

server.listen(port, hostname, () => {
        console.log('Server running at http://' + hostname + ':' + port  + '/');
});*/

var express = require('express')
var app = express()

app.get('/', function(req, resp){
   resp.send('Hello world')
})

app.listen(8080, () => {console.log("Server running at https://127.0.0.1:8080");})
