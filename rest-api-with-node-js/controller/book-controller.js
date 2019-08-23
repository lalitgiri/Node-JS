var bookController = (Book) => {

    var post = (req, res) => {
        var book = new Book(req.body);
        book.save(book);
        res.send(book);
    }
    var get = (req, res) => {
        Book.find(req.query, (err, books) => {
            if (err) {
                res.status(500).send(err);
            }
            else
                res.status(200).json(books)
        });
    }
    var getById = (req, res) => {
        res.json(req.book);
    }
    var put = (req, res) => {
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

    }
    var patch = (req, res) => {
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
    }
    var remove = (req, res) => {
        req.book.remove((err) => {
            if (err)
                res.status(500).send(err);
            else {
                res.status(200).send("Removed");
            }
        })
    }

    var middleWare = (req, res, next) => {
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
    }

    return {
        post: post,
        get: get,
        getById: getById,
        put: put,
        patch: patch,
        delete: remove,
        middleWare: middleWare
    }
}

module.exports = bookController;