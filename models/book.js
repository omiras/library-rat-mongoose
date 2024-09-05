const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    title: String,
    summary: String,
    isbn: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Authors' },
    reservations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reservations' },] // Bonus 5
})

const Book = new mongoose.model('Books', bookSchema);
module.exports = Book;