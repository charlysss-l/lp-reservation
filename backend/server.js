const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const UserModel = require('./Users');
const ImageIdModel = require('./imageID');
require('dotenv').config();

const { addUser, fetchUser, removeUser, updateEndReservation } = require('./user');
const { addSeat, fetchSeats, removeSeat, Seat, updateSeatStatus } = require('./seat');
const loginAdm = require('./src/routes/login');

const app = express();
const port = 3000;

app.use(cors({
    origin: 'https://lp-reservation.vercel.app', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json());
app.use('/Images', express.static(path.join(__dirname, 'public/images')));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

app.get('/', (req, res) => {
    res.send('Express app is running');
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const existingImage = await UserModel.findOne().sort({ image_id: -1 });

        if (existingImage) {
            const fs = require('fs');
            const imagePath = path.join(__dirname, 'public/images', existingImage.image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }

            await UserModel.deleteOne({ _id: existingImage._id });
        }

        let imageIdDoc = await ImageIdModel.findOne();
        if (!imageIdDoc) {
            imageIdDoc = new ImageIdModel({ currentId: 0 });
            await imageIdDoc.save();
        }

        const imageId = imageIdDoc.currentId;
        imageIdDoc.currentId += 1;
        await imageIdDoc.save();

        const newImage = new UserModel({ image_id: imageId, image: req.file.filename });
        await newImage.save();

        res.json({ image: newImage.image });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

app.get('/getImage', (req, res) => {
    UserModel.find().sort({ image_id: -1 }).limit(1)
        .then(users => res.json(users))
        .catch(err => res.status(500).json(err));
});

app.post('/upload-seat-image', upload.single('file'), async (req, res) => {
    try {
        const imageUrl = req.file.filename;
        res.json({ success: true, imageUrl });
    } catch (err) {
        console.error('Error uploading image:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

app.put('/admin/update-seat/:seat_id', async (req, res) => {
    try {
        const { seat_id } = req.params;
        const { seatNumber, ThreeHourImage, WholeDayImage } = req.body;

        if (!seat_id || !seatNumber) {
            return res.status(400).json({ success: false, message: 'Invalid input' });
        }

        const updatedSeat = await Seat.findOneAndUpdate(
            { seat_id },
            { seatNumber, ThreeHourCode: ThreeHourImage, WholeDayCode: WholeDayImage },
            { new: true }
        );

        if (updatedSeat) {
            res.json({ success: true, seat: updatedSeat });
        } else {
            res.status(404).json({ success: false, message: 'Seat not found' });
        }
    } catch (error) {
        console.error('Error updating seat:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

app.use('/auth', loginAdm);

app.post('/admin/add-reservation', addUser);
app.get('/admin/history-table', fetchUser);
app.post('/admin/remove-user', removeUser);
app.post('/admin/end-reservation', updateEndReservation);

app.post('/admin/add-seat', addSeat);
app.get('/admin/seat-qr', fetchSeats);
app.post('/admin/remove-seat', removeSeat);
app.put('/admin/update-seat-status', updateSeatStatus);

const admin = require('./src/scripts/admin');
admin();

app.listen(port, err => {
    if (err) {
        console.error(`Error starting server: ${err}`);
    } else {
        console.log(`Server running on port ${port}`);
    }
});
