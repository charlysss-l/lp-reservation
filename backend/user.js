const mongoose = require('mongoose');

// Define User Schema
const userSchema = new mongoose.Schema({
    user_id: {
        type: Number,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    contactNumber: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    seatNumber: {
        type: String,
        required: true,
    },
    internetHours: {
        type: String,
        enum: ['3', '24'],
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        default: Date.now,
        required: true,
    },
    startTime: {
        type: Date,
        default: () => new Date(),
        required: true,
    },
    expectedEndDate: {
        type: Date,
        required: true,
    },
    expectedEndTime: {
        type: Date,
        required: true,
    },
    finalEndDate: {
        type: Date,
    },
    finalEndTime: {
        type: Date,
    },
});

// Create User Model
const User = mongoose.model('User', userSchema);

// Function to calculate expected end date and time
const calculateExpectedEnd = (startTime, internetHours) => {
    const endTime = new Date(startTime);
    endTime.setHours(endTime.getHours() + parseInt(internetHours, 10));
    return endTime;
};

// Function to add user
const addUser = async (req, res) => {
    try {
        let lastUser = await User.findOne({}).sort({ user_id: -1 }).limit(1);
        let id = lastUser ? lastUser.user_id + 1 : 1;

        const startDate = new Date(req.body.startDate);
        const startTime = new Date(req.body.startTime);
        const internetHours = req.body.internetHours;

        // Calculate expected end date and time
        const expectedEndTime = calculateExpectedEnd(startTime, internetHours);
        const expectedEndDate = new Date(expectedEndTime); // Ensure it's a Date object

        const user = new User({
            user_id: id,
            name: req.body.name,
            email: req.body.email,
            contactNumber: req.body.contactNumber,
            company: req.body.company,
            seatNumber: req.body.seatNumber,
            internetHours: internetHours,
            code: req.body.code,
            startDate: startDate,
            startTime: startTime,
            expectedEndDate: expectedEndDate,
            expectedEndTime: expectedEndTime,
        });

        await user.save();

        res.json({ success: true, name: req.body.name });
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ success: false, message: 'An error occurred while adding the user' });
    }
};

// Function to fetch users
const fetchUser = async (req, res) => {
    try {
        const users = await User.find({}, {
            user_id: 1,
            name: 1,
            email: 1,
            contactNumber: 1,
            company: 1,
            seatNumber: 1,
            internetHours: 1,
            startDate: 1,
            startTime: 1,
            code: 1, // Ensure 'code' field is included
            expectedEndDate: 1,
            expectedEndTime: 1,
        });
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ success: false, message: 'An error occurred while fetching users' });
    }
};

// Function to remove user
const removeUser = async (req, res) => {
    try {
        await User.findOneAndDelete({ user_id: req.body.user_id });
        console.log("User removed");
        res.json({
            success: true,
            user_id: req.body.user_id,
        });
    } catch (error) {
        console.error("Error removing user:", error);
        res.status(500).json({
            success: false,
            message: 'Failed to remove user',
        });
    }
};

module.exports = { addUser, fetchUser, removeUser };
