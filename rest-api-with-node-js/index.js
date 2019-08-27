const express = require('express');
const bookRouter = require('./routes/routes');


const hostname = 'localhost';
const port = 3100;

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/api/books/', bookRouter);
app.get('/', (req, res) => {
    res.send('Welcome to My Api...')
})
app.listen(port, hostname, () => {
    console.log(`server running at http://${hostname}:${port}`);
});

// const server = http.createServer(app);

// server.listen(port, hostname, () => {
//     console.log(`server running at http://${hostname}:${port}`);
// });

module.exports = app;