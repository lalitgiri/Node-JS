const express = require('express');

const Book = require('../mongo-db-connection/mongo-db');
// const bodyParser = require('body-parser');

var bookRouter = express.Router();

bookRouter.route('/Books')
    .post((req, res) => {
        console.log(req.body);
        var book = new Book(req.body);
        book.save(book);
        res.send(book);
    })
    .get((req, res) => {
        Book.find(req.query, (err, books) => {
            if (err) {
                res.status(500).send(err);
            }
            else
                res.status(200).json(books)
        });
    })

bookRouter.route('/Books/:bookId')
    .get((req, res) => {
        Book.findById(req.params.bookId, (err, book) => {
            if (err) {
                res.status(500).send(err);
            }
            else
                res.status(200).json(book);
        });
    })
    .put((req, res) => {
        Book.findById(req.params.bookId, (err, book) => {
            if (err) {
                res.status(500).send(err);
            }
            else {
                book.title = req.body.title;
                book.author = req.body.author;
                book.genre = req.body.genre;
                book.read = req.body.read;

                book.save();
                res.status(200).json(book)
            }
        });
    });
module.exports = bookRouter;



// bookRouter.route('/Books')
//     .get(async (req, res) => {

//         // try {
//         //     const newBook = new Book({ 'title': 'title1', 'author': 'author1', 'genre': 'genre1', 'read': true });
//         //     await newBook.save()
//         //         .then(resBook => {
//         //             if (resBook) {
//         //                 console.log('resBook', resBook)
//         //             }
//         //         })
//         //         .catch(err => {
//         //             console.log('error', err);
//         //         });
//         // } catch (error) {
//         //     console.log('error2', error)
//         // }


//         Book.find((err, books) => {
//             if (err) {
//                 res.status(500).send(err);
//             }
//             else
//                 res.status(200).json(books)
//         });
//     });
