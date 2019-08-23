const express = require('express');

const Book = require('../mongo-db-connection/mongo-db');


var bookRouter = express.Router();

bookRouter.route('/')
    .post((req, res) => {
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

bookRouter.use('/:bookId', (req, res, next) => {
    Book.findById(req.params.bookId, (err, book) => {
        if (err) {
            res.status(500).send(err);
        }
        else if (book) {
            req.book = book;
            next();
        }
        else {
            res.status(404).send("Book Not Found");
        }
    });
})

bookRouter.route('/:bookId')
    .get((req, res) => {
        res.json(req.book);
    })
    .put((req, res) => {
        req.book.title = req.body.title;
        req.book.author = req.body.author;
        req.book.genre = req.body.genre;
        req.book.read = req.body.read;

        req.book.save((err) => {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.status(200).json(req.book);
            }
        });

    })
    .patch((req, res) => {
        if (req.body._id)
            delete req.body._id;
        for (var key in req.body) {
            req.book[key] = req.body[key];
        }
        req.book.save((err) => {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.status(200).json(req.book);
            }
        });
    })
    .delete((req, res) => {
        req.book.remove((err) => {
            if (err)
                res.status(500).send(err);
            else {
                res.status(200).send("Removed");
            }
        })
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
