const bcrypt = require('bcryptjs');
const Userr = require('../models/user.js');

const createAdminAccount = async () => {
    try {
        const existingAdmin = await Userr.findOne({ email: 'admintest@gmail.com' });
        if (!existingAdmin) {
            const newAdmin = new Userr({
                email: 'admintest@gmail.com',
                name: 'Admin',
                password: await bcrypt.hash('admin', 10),
                role: 'admin'
            });
            await newAdmin.save();
            console.log('Admin account created');
        } else {
            console.log("Admin already exists");
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports = createAdminAccount; // Export using module.exports
