const mongoose = require('mongoose');
const User = require('./user');
const Seat = require('./seat');
const seat = require('./seat');
const reservationSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    seat:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Seat',
        required:true,
    },
    startDate:{
        type:Date,
        required:true
    }
});
module.exports = mongoose.model('Reservation', reservationSchema);
