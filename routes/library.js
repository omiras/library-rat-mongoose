var express = require('express');
var router = express.Router();

const Book = require('../models/book');
const Author = require('../models/author');
const Reservation = require('../models/reservation');

/* GET users listing. */
router.get('/add-author', function (req, res, next) {
  res.render('add-author')
});

router.post('/add-author', async function (req, res) {
  // Iteración 1
  console.log("🚀 ~ file: library.js:16 ~ req.body:", req.body);

  const { firstName, familyName, dateBirth, dateDeath } = req.body;

  const createdAuthor = await Author.create({
    firstName,
    familyName,
    dateBirth,
    dateDeath
  });
  res.json(createdAuthor);

})


router.get('/add-book', async (req, res) => {
  // 1. Recuperar todos los autores de la coleccion Authors

  const authors = await Author.find(); // TODO: Iteración 2
  res.render('add-book', {
    authors
  })
})

router.post('/add-book', async (req, res) => {

  // ES6. Dentro del objeto req.body existe un campo de nombre 'title', otro 'summary', etc.

  // Iteración 3: NO hay que hacer nada, solo contestar a la pregunta del README.md
  const { title, summary, isbn, author } = req.body;

  const book = new Book({
    title,
    summary,
    isbn,
    author
  })

  const resultado = await book.save();
  res.send(resultado);

})

router.get('/books', async (req, res) => {
  const books = await Book.find().populate('author'); // Iteración 4
  console.log("🚀 ~ file: library.js:59 ~ router.get ~ books:", books)

  console.log("Libros a enviar a la vista: ", books);

  res.render('books', {
    books
  })
})

router.get('/book/:idBook/reservation', async (req, res) => {
  const { idBook } = req.params;

  const book = await Book.findById(idBook);

  res.render('reservation', {
    book
  });

});

router.post('/reservation/new-reservation', async (req, res) => {

  const { startDate, endDate, idBook } = req.body;
  const book = await Book.findById(idBook);

  const newReservation = await Reservation.create({
    startDate,
    endDate,
    book: idBook
  });

  book.reservations.push(newReservation);
  await book.save();

  res.json(newReservation);


})

module.exports = router;
