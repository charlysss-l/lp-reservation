const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
    seat_id: {
        type: Number,
        required: true,
        unique: true,
    },
    seatNumber: {
        type: String,
        required: true,
    },
    ThreeHourCode: {
        type: String,
        required: true,
    },
    WholeDayCode: {
        type: String,
        required: true,
    }
});

const Seat = mongoose.model('Seat', seatSchema);

const addSeat = async (req, res) => {
    try {
        let lastSeat = await Seat.findOne({}).sort({ seat_id: -1 }).limit(1);
        let id = lastSeat ? lastSeat.seat_id + 1 : 1;

        const seat = new Seat({
            seat_id: id,
            seatNumber: req.body.seatNumber,
            ThreeHourCode: req.body.ThreeHourImage, // Use image URL
            WholeDayCode: req.body.WholeDayImage  // Use image URL
        });

        await seat.save();
        res.json({ success: true, seatNumber: req.body.seatNumber });
    } catch (error) {
        console.error('Error adding seat:', error);
        res.status(500).json({ success: false, message: 'An error occurred while adding the seat', error });
    }
};


const fetchSeats = async (req, res) => {
    try {
        const seats = await Seat.find({});
        res.json(seats); // Send the seats data as JSON
    } catch (error) {
        console.error('Error fetching seats:', error);
        res.status(500).json({ success: false, message: 'An error occurred while fetching seats' });
    }
};

const removeSeat = async (req, res) => {
    try {
        await Seat.findOneAndDelete({ seat_id: req.body.seat_id });
        console.log("Seat removed");
        res.json({
            success: true,
            seat_id: req.body.seat_id,
        });
    } catch (error) {
        console.error("Error removing seat:", error);
        res.status(500).json({
            success: false,
            message: 'Failed to remove seat',
        });
    }
};

module.exports = { addSeat, fetchSeats, removeSeat };