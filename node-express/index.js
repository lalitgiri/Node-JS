const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const hostname = 'localhost';
const port = 3000;

const app = express();
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.all('/dishes', (req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
});

app.get('/dishes', (req, res, next) => {
    res.end('Will send all the dishes to you!');
});
app.get('/dishes/:id', (req, res, next) => {
    res.end('Will send details of the dishes : ' + req.params.id + ' to you!');
});

app.post('/dishes', (req, res, next) => {
    res.end('Will add the dish : ' + req.body.name + ' with details ' + req.body.description);;
});

app.post('/dishes/:id', (req, res, next) => {
    res.statusCode = 403;
    res.end('POST not supporetd on /dishes/ ' + req.params.id + ' !');
});
app.put('/dishes', (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT not supporetd on /dishes!');
});
app.put('/dishes/:id', (req, res, next) => {

    res.write('Updating the dish: ' + req.params.id + '\n');
    res.end('will update the dish: ' + req.body.name + ' with details: ' + req.body.description);
});

app.delete('/dishes', (req, res, next) => {
    res.end('Deleting all the dishes.!');
});
app.delete('/dishes/:id', (req, res, next) => {
    res.end('Deleting the dish ' + req.params.id + ' !');
});
app.use((req, res, next) => {
    res.status = 200;
    res.setHeader('Content-Type', 'Text/Html');
    res.end(`
        <html>
            <body>
                <h1>This is an express server.</h1>
            </body>
        </html>
    `);
});

const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`server running at http://${hostname}:${port}`);
});