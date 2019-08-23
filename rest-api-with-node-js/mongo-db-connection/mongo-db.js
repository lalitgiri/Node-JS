
const mongoose = require('mongoose');

var db;

if (process.env.ENV == 'Test')
    db = mongoose.connect('mongodb://127.0.0.1:27017/test_db', { useNewUrlParser: true }, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log("Testing Environment Database Connected")
        }
    });
else
    db = mongoose.connect('mongodb://127.0.0.1:27017/test', { useNewUrlParser: true }, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log("Database Connected")
        }
    });

var Book = require('../models/bookModel');

module.exports = Book;

