const express = require('express');

const Book = require('../mongo-db-connection/mongo-db');
const bookController = require('../controller/book-controller')(Book);


var bookRouter = express.Router();

bookRouter.route('/')
    .post(bookController.post)
    .get(bookController.get)

bookRouter.use('/:bookId', bookController.middleWare);

bookRouter.route('/:bookId')
    .get(bookController.getById)
    .put(bookController.put)
    .patch(bookController.patch)
    .delete(bookController.delete);

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
