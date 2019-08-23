// dependency required gulp-mocha, should and sinon

var should = require('should');
var sinon = require('sinon');

// we dont need the reference to Mocha because it's actually going to run inside the Mocha Framework....


describe('Book Controller Test', () => {
    describe('Post', () => {
        it('Should not allow  an empty title on post.', () => {
            var Book =function (book) { this.save = () => { } }

            var req = {
                body: {
                    author: 'Author Name'
                }
            }

            var res = {
                status: sinon.spy(),
                send: sinon.spy()
            }

            var bookController = require('../controller/book-controller')(Book);
            bookController.post(req,res);
            res.status.calledWith(400).should.equal(true, 'Bad Status'+res.status.args[0][0]);          
            res.send.calledWith('Title is required').should.equal(true);
        });
    })
})

// supertest gulp-env
