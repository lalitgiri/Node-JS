const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.end('Will send all the dishes to you!');
})
.post((req, res, next) => {
    res.end('Will add the dish : ' + req.body.name + ' with details ' + req.body.description);;
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT not supporetd on /dishes!');
})
.delete((req, res, next) => {
    res.end('Deleting all the dishes.!');
});

dishRouter.route('/:id')
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

module.exports = dishRouter;