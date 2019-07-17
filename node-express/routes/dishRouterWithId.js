const express = require('express');
const bodyParser = require('body-parser');

const dishRouterWithId = express.Router();

dishRouterWithId.use(bodyParser.json());

dishRouterWithId.route('/:id')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.end('Will send details of the dishes : ' + req.params.id + ' to you!');
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST not supporetd on /dishes/ ' + req.params.id + ' !');
})
.put((req, res, next) => {
    res.write('Updating the dish: ' + req.params.id + '\n');
    res.end('will update the dish: ' + req.body.name + ' with details: ' + req.body.description);
})
.delete((req, res, next) => {
    res.end('Deleting the dish ' + req.params.id + ' !');
});

module.exports = dishRouterWithId;