
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/test', { useNewUrlParser: true }, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log("Database Connected")
    }
});

var Book = require('../models/bookModel');

module.exports = Book;

