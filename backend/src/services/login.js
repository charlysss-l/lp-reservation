const bcrypt = require('bcrypt');
const Userr = require('../models/user.js');
const { generateToken } = require('../utils/jwtUtils.js'); // Correct function name
const { verifyToken } = require('../utils/authMiddleware.js');

const loGin = async (email, password) => {
    try {
        console.log('Login attempt:', email); // Log email
        if (!email || !password) {
            throw new Error('Email or password missing'); // Handle missing data
        }
        
        const existingUser = await Userr.findOne({ email });
        if (!existingUser) {
            console.log('User not found'); // Log if user is not found
            throw new Error('User not found');
        }
        
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            console.log('Incorrect password'); // Log incorrect password
            throw new Error('Incorrect password');
        }
        
        const token = generateToken(existingUser);
        console.log('Token generated:', token); // Log generated token
        return token;
    } catch (error) {
        console.log('Login error:', error.message);
        throw new Error('Invalid credentials');
    }
};

const refreshTokenService = async (oldToken) => {
    try {
        console.log('Refreshing token:', oldToken); // Log the old token
        const decodedToken = verifyToken(oldToken);
        console.log('Decoded token:', decodedToken); // Log decoded token
        const user = await Userr.findById(decodedToken.id); // Use `id` to match token data
        if (!user) {
            console.log('User not found during token refresh'); // Log if user is not found
            throw new Error('User not found');
        }
        const newToken = generateToken(user); // Ensure correct function name
        console.log('New token generated:', newToken); // Log new token
        return newToken;
    } catch (error) {
        console.log('Refresh token error:', error.message);
        throw new Error("Invalid token");
    }
};

module.exports = { loGin, refreshTokenService }; // Export using module.exports
