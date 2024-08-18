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
    seatNumber: {  // Ensure this field exists
        type: String,
        required: true,
    },
    internetHours: {  // Ensure this field exists
        type: String,
        enum: ['3', '24'],
        required: true,
    },
    code: {  // Ensure this field exists
        type: String,
        required: true,
    },
    startDate:{
        type:Date,
        default: Date.now,
        required: true,
    },
    startTime:{
        type:Date,
        default:() => new Date(),
        required: true,
    },
});


// Create User Model
const User = mongoose.model('User', userSchema);

// Function to add user
const addUser = async (req, res) => {
    try {
        let lastUser = await User.findOne({}).sort({ user_id: -1 }).limit(1);
        let id = lastUser ? lastUser.user_id + 1 : 1;

        const user = new User({
            user_id: id,
            name: req.body.name,
            email: req.body.email,
            contactNumber: req.body.contactNumber,
            company: req.body.company,
            seatNumber: req.body.seatNumber,
            internetHours: req.body.internetHours,
            code: req.body.code,
            startDate: req.body.startDate,
            startTime: req.body.startTime,

        });

        console.log('User to save:', user);
        await user.save();
        console.log('User saved');

        res.json({ success: true, name: req.body.name });
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ success: false, message: 'An error occurred while adding the user' });
    }
};



// Function to fetch users
const fetchUser = async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users); // Send the users as JSON response
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ success: false, message: 'An error occurred while fetching users' });
    }
};

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
}

module.exports = { addUser, fetchUser, removeUser };
