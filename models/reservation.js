const mongoose = require('mongoose');

// Bonus 1,2,3

const reservationSchema = new mongoose.Schema({
    startDate: Date,
    endDate: Date,
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Books' } // Referencia al libro asociado

});

const Reservation = mongoose.model('Reservation', reservationSchema);
module.exports = Reservation;

