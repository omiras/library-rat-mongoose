# Rata de Biblioteca

Queremos implementar una app que permite añadir libros y escritores. Nos comentan que es imporante poder cambiar los datos de los libros y los escritores de forma independiente, por lo que hemos implementado las dos entidades en dos colecciones diferentes, que van a ser relacionadas entre si a partir de su ObjectID.

![](https://images.pexels.com/photos/7008914/pexels-photo-7008914.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)

Arregla los fallos de la app. En cada apartado se especifica que fichero y función hay que modificar. Todas las vistas estan correctas, al igual que los modelos.

## Iteración 1

No podemos añadir autores, pues el controlador no está implementado. Gestiona adecuadamente el POST en la ruta-controlador del fichero **routers/library.js** para añadir un nuevo escritor desde el formulario accesible en [Add Author](http://localhost:3000/catlog/add-author)

```
router.post('/add-author', async function(req, res) {
    // Iteración 1
})
```

Una vez arreglado, añade un par de tus escritoras favoritas a la base de datos mediante el formulario.

## Iteración 2

Queremos poder ahora añadir libros. El formulario de [Add Book](http://localhost:3000/catlog/add-book) se renderiza correctamente, pero no podemos elegir el escritor del libro. Gestiona adecuadamente el GET en la ruta-controlador del fichero **routers/library.js**

Nota: mientras no completes la iteración 2, no podrás ver el formulario de añadir libro (tendrás un error EJS).

```
router.get('/add-book', async (req, res) => {
  // Recuperar todos los autores de la coleccion Authors
  const authors = {} // TODO: Iteración 2
  res.render('add-book', {
    authors 
  })
})

```

## Iteración 3

Comprueba que ahora puedes añadir también libros al a base de datos. Añade un par de ellos. Usa escritores diferentes. Contesta a la pregunta: Para cada libro que insertamos en la colección __books__; ¿que 4 campos guardamos para cada docmento? Ayúdate abriendo uno de los documentos de la colección __books__

Fíjate en la respuesta que da el endpoint al insertar un libro

## Iteración 4

Cuando queremos mostrar todos los libros mediante la opción de menú [Show Books](http://localhost:3000/catlog/books) , la información del autor no aparece correctamente. Modifica el fichero **routers/library.js**, en la ruta-controlador:

```
router.get('/books', async (req, res) => {
  const books = await Book.find(); // Iteración 4

  console.log("Libros a enviar a la vista: ", books);

  res.render('books', {
    books
  })
})

```

Haz que se muestren correctamente también los datos del autor del libro, que esta referenciado mediante su ObjectID a la colección __authors__

Pista: [Populate fields](https://mongoosejs.com/docs/populate.html#populate_an_existing_mongoose_document)

## Iteración BONUS

Queremos implementar la opción de reservar un libro. 

1. Añade un nuevo esquema, de nombre bookingSchema.js, en **models/books.js**
2. Un bookingSchema se compone de los siguientes campos
  1. Fecha de inicio de reserva
  2. Fecha fin de la reserva 
3. Modifica el schema bookSchema para que ahora admita un conjunto de reservas. Al nuevo campo le podemos llamar __bookings__
4. Crea un formulario y el controlador adecuado para recuperarlo.  Por ejemplo en el endpoint /book/:id/book. Adicionalmente, puedes añadir un botón de "Reservar" a cada uno de los libros en la vista que muestra todos los libros.
5. Crea un endpoint para gestionar el POST /book/:id/book
6. Añade la reserva al array de reservas del libro
7. Comprueba que se ha actualizado correctamente el docmento el MongoDB (deberia tener un 'array' de reservas en el campo __bookings__)
8. **MEGA-BONUS**: Impide que un libro se pueda reservar 