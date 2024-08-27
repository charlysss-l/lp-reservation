const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const UserModel = require('./Users');
const { v4: uuidv4 } = require('uuid');
const ImageIdModel = require('./imageID');





const { addUser, fetchUser, removeUser, updateEndReservation } = require('./user');
const { addSeat, fetchSeats, removeSeat } = require('./seat');


const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use('/Images', express.static(path.join(__dirname, 'public/images')));

// Connect to MongoDB
mongoose.connect('mongodb+srv://lp-reservation:lp-reservation@cluster0.qjwlv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
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

const upload = multer ({ 
    storage: storage
})

app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        // Fetch the existing image
        const existingImage = await UserModel.findOne().sort({ image_id: -1 });

        // Delete the old image if it exists
        if (existingImage) {
            // Delete the image file from the filesystem (optional)
            const fs = require('fs');
            const imagePath = path.join(__dirname, 'public/images', existingImage.image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath); // Remove the file from the filesystem
            }

            // Remove the image record from the database
            await UserModel.deleteOne({ _id: existingImage._id });
        }

        // Get or initialize the current image_id
        let imageIdDoc = await ImageIdModel.findOne();
        if (!imageIdDoc) {
            imageIdDoc = new ImageIdModel({ currentId: 0 });
            await imageIdDoc.save();
        }

        // Increment the image_id and save
        const imageId = imageIdDoc.currentId;
        imageIdDoc.currentId += 1;
        await imageIdDoc.save();

        // Create the new image record
        const newImage = new UserModel({ image_id: imageId, image: req.file.filename });
        await newImage.save();

        // Send back the image information
        res.json({ image: newImage.image });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});



app.get('/getImage', (req, res) => {
    UserModel.find().sort({ image_id: -1 }).limit(1) // Sort by image_id in descending order
        .then(users => res.json(users))
        .catch(err => res.status(500).json(err));
});







// Routes
app.post('/admin/add-reservation', addUser);
app.get('/admin/history-table', fetchUser);
app.post('/admin/remove-user', removeUser);
app.post('/admin/end-reservation', updateEndReservation);

app.post('/admin/add-seat', addSeat);
app.get('/admin/seat-qr', fetchSeats);
app.post('/admin/remove-seat', removeSeat);

app.listen(port, err => {
    if (err) {
        console.error(`Error starting server: ${err}`);
    } else {
        console.log(`Server running on port ${port}`);
    }
});
