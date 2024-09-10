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
        enum: ['3', '24', '168', '720'], 
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
        required: true,
    },
    expectedEndDate: {
        type: Date,
        default: null, // Allow null for weekly/monthly reservations

        required: function() { return this.internetHours !== '720' && this.internetHours !== '168'; }, // Only required if not weekly/monthly
    },
    expectedEndTime: {
        type: Date,
        default: null, // Allow null for weekly/monthly reservations
        required: function() { return this.internetHours !== '720' && this.internetHours !== '168'; }, // Only required if not weekly/monthly
    },
    finalEndDate: {
        type: Date,
        default: null,
        required: false,
    },
    status: {
        type: String,
        enum: ['active', 'available'],
        default: 'available',
    }
});

// Create User Model
const User = mongoose.model('User', userSchema);


const calculateExpectedEnd = (startTime, internetHours) => {
    const endTime = new Date(startTime);
    const hours = parseInt(internetHours, 10);

    if (isNaN(hours) || hours <= 0) {
        throw new Error('Invalid internet hours value');
    }

    // Add hours to the endTime
    endTime.setHours(endTime.getHours() + hours);

    return endTime;
};



// Function to add user
const addUser = async (req, res) => {
    try {
        const { seatNumber, startTime, internetHours } = req.body;

        // Check for existing reservation
        const existingReservation = await User.findOne({
            seatNumber,
            expectedEndTime: { $gte: new Date(startTime) },
            startTime: { $lte: calculateExpectedEnd(new Date(startTime), internetHours) },
            status: 'active' // Ensure we're checking for active reservations only
        });

        if (existingReservation) {
            return res.status(400).json({ success: false, message: 'Seat is already reserved during this time' });
        }

        // Generate new user_id
        let lastUser = await User.findOne({}).sort({ user_id: -1 }).limit(1);
        let id = lastUser ? lastUser.user_id + 1 : 1;

        // Create new user
        const startDate = new Date(req.body.startDate);
        const startTimeDate = new Date(req.body.startTime);

        let expectedEndDate = null;
        let expectedEndTime = null;

        if (internetHours !== '720' && internetHours !== '168') {
            const calculatedEndTime = calculateExpectedEnd(startTimeDate, internetHours);
            expectedEndDate = new Date(calculatedEndTime);
            expectedEndTime = calculatedEndTime;
        }

        

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
            startTime: startTimeDate,
            expectedEndDate: new Date(expectedEndTime),
            expectedEndTime: expectedEndTime,
            status: 'active' // Set status to 'active' when adding reservation
        });

        await user.save();

        res.json({ success: true, name: req.body.name });
    } catch (error) {
        console.error('Error adding user:', error); // Log detailed error message
        res.status(500).json({ success: false, message: 'An error occurred while adding the user', error: error.message });
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
            code: 1,
            expectedEndDate: 1,
            expectedEndTime: 1,
            finalEndDate: 1,
            status: 1,
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
        const result = await User.findOneAndDelete({ user_id: req.body.user_id });
        if (result) {
            console.log("User removed");
            res.json({
                success: true,
                user_id: req.body.user_id,
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }
    } catch (error) {
        console.error("Error removing user:", error);
        res.status(500).json({
            success: false,
            message: 'Failed to remove user',
        });
    }
};

const updateEndReservation = async (req, res) => {
    const { user_id, finalEndDate } = req.body;

    try {
        const finalEndDateTime = new Date(finalEndDate);
        if (isNaN(finalEndDateTime.getTime())) {
            return res.status(400).json({ message: 'Invalid date format' });
        }

        const result = await User.updateOne(
            { user_id },
            {
                finalEndDate: finalEndDateTime,
                status: 'available', // Update status to 'available'
            }
        );

        if (result.nModified === 0) {
            return res.status(404).json({ message: 'Reservation not found' });
        }

        console.log(`Reservation ${user_id} ended at ${finalEndDateTime}`);
        res.status(200).json({ message: 'Reservation updated successfully' });
    } catch (error) {
        console.error('Error updating reservation:', error);
        res.status(500).json({ message: 'Error updating reservation', error: error.message });
    }
};

module.exports = {
    addUser,
    fetchUser,
    removeUser,
    updateEndReservation
};
