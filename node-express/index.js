const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const dishRouter = require('./routes/dishRouter');


const hostname = 'localhost';
const port = 3000;

const app = express();
app.use(morgan('dev'));

/*  

// basic authentication 

function auth (req, res, next) {
    console.log(req.headers);
    var authHeader = req.headers.authorization;
    if (!authHeader) {
        var err = new Error('You are not authenticated!');
        res.setHeader('WWW-Authenticate', 'Basic'); //this is gives a pop to enter password and username.
        err.status = 401;
        next(err);
        return;
    }
  
    var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    var user = auth[0];
    var pass = auth[1];
    if (user == 'admin' && pass == 'password') {
        next(); // authorized
    } else {
        var err = new Error('You are not authenticated!');
        res.setHeader('WWW-Authenticate', 'Basic');      
        err.status = 401;
        next(err);
    }
  }
  
  app.use(auth);

  */

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use('/dishes/',dishRouter);


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