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

var birds = require('./birds.json')


app.get('/', function(req, resp){
   resp.send('Bird Database')
})

app.get('/birds/:id/prev', function(req, resp){ 
        resp.setHeader('Access-Control-Allow-Origin', 'https://josephrarsany.github.io');
        if (req.params.id > 0){        
                let id = (req.params.id - 1) % birds.length ;
        }
        else{
                let id = birds.length - 1;
        }
        let response = birds[id];
        response["id"] = id;
        resp.send(response);
})

app.get('/birds/:id/next', function(req, resp){ 
        resp.setHeader('Access-Control-Allow-Origin', 'https://josephrarsany.github.io');
        let id = (req.params.id + 1) % birds.length;
        let response = birds[id];
        response["id"] = id;
        resp.send(response);
})

app.get('/birds/:id', function(req, resp){ 
        resp.setHeader('Access-Control-Allow-Origin', 'https://josephrarsany.github.io');
        let id = req.params.id;
        let response = birds[id];
        response["id"] = id;
        resp.send(response);
})

app.get('*', function(req, res){
        res.statusCode = 404;
        res.send("Error: Not found")
})

app.listen(8080, () => {console.log("Server running at https://127.0.0.1:8080");})
