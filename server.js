var fs = require('fs');
var express = require('express');
var cors = require('cors');
var app = express();

var corsOptions = {
        origin: '*',
        optionsSuccessStatus: 200
      }

var birds = require('./birds.json');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors(corsOptions));

app.get('/', function(req, resp){
   resp.send('Bird Database');
});

app.options('/addbird', cors(corsOptions))

app.get('/birds/:id/prev', function(req, resp){ 
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
        let id = parseInt(req.params.id) + 1;
        if (id == birds.length){ id = 0;}
        let response = birds[id];
        response["id"] = id;
        resp.send(response);
});

app.get('/birds/:id', function(req, resp){ 
        let id = req.params.id;
        let response = birds[id];
        response["id"] = id;
        resp.send(response);
});

app.post('/addbird', function (req, resp){
        const Bird = JSON.parse(Object.keys(req.body)[0]);
        console.log(Bird);
        birds.push(Bird); 
        const json = JSON.stringify(birds);
        fs.writeFile('birds.json', json, 'utf8', console.log);
})

app.delete('/removebird/:id', function(req, resp){
        let id = parseInt(req.params.id);
        birds.splice(id, 1);
        const json = JSON.stringify(birds);
        fs.writeFile('birds.json', json, 'utf8', console.log);
})

app.get('*', function(req, res){
        res.statusCode = 404;
        res.send("Error: Not found")
});

app.listen(8080, () => {console.log("Server running at https://127.0.0.1:8080");});
