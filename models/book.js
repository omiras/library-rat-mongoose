const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    title: String,
    summary: String,
    isbn: String,
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'Authors'}
})

const Book = new mongoose.model('Books', bookSchema);
module.exports = Book;