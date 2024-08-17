const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { addUser, fetchUser } = require('./user');
const { addSeat, fetchSeats } = require('./seat');
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://lp-reservation:lp-reservation@cluster0.qjwlv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

app.get('/', (req, res) => {
    res.send('Express app is running');
});

// Routes
app.post('/admin/add-reservation', addUser);
app.get('/admin/history-table', fetchUser);  

app.post('/admin/add-seat', addSeat);
app.get('/admin/seat-qr', fetchSeats);  

app.listen(port, err => {
    if (err) {
        console.error(`Error starting server: ${err}`);
    } else {
        console.log(`Server running on port ${port}`);
    }
});
