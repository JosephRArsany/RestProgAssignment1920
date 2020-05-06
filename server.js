var fs = require('fs');
var express = require('express');
var app = express();

var birds = require('./birds.json');


app.get('/', function(req, resp){
   resp.send('Bird Database');
});

app.get('/birds/:id/prev', function(req, resp){ 
        resp.setHeader('Access-Control-Allow-Origin', 'https://josephrarsany.github.io');
        let id = 0
        if (req.params.id > 0){        
                id = (req.params.id - 1) % birds.length ;
        }
        else{
                id = birds.length - 1;
        }
        let response = birds[id];
        response["id"] = id;
        resp.send(response);
});

app.get('/birds/:id/next', function(req, resp){ 
        resp.setHeader('Access-Control-Allow-Origin', 'https://josephrarsany.github.io');
        let id = (req.params.id + 1) % birds.length;
        let response = birds[id];
        response["id"] = id;
        resp.send(response);
});

app.get('/birds/:id', function(req, resp){ 
        resp.setHeader('Access-Control-Allow-Origin', 'https://josephrarsany.github.io');
        let id = req.params.id;
        let response = birds[id];
        response["id"] = id;
        resp.send(response);
});

app.post('/addbird', function (req, resp){
        resp.setHeader('Access-Control-Allow-Origin', 'https://josephrarsany.github.io');
        const Bird = req.body;
        birds.push(Bird); 
        const json = JSON.stringify(birds);
        fs.writeFile('birds.json', json, 'utf8', console.log);
})

app.get('*', function(req, res){
        res.statusCode = 404;
        res.send("Error: Not found")
});

app.listen(8080, () => {console.log("Server running at https://127.0.0.1:8080");});
