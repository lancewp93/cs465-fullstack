const mongoose = require('mongoose');
const User = require('../models/user');
const passport = require('passport');
const { validateRegistrationPayload, validateLoginPayload } = require('../validation');

const register = async (req, res) => {
    const validationError = validateRegistrationPayload(req.body);

    if (validationError) {
        return res.status(400).json({ message: validationError });
    }

    try {
        const existingUser = await User.findOne({ email: req.body.email.trim() }).exec();

        if (existingUser) {
            return res.status(409).json({ message: 'User already exists.' });
        }

        const user = new User({
            name: req.body.name.trim(),
            email: req.body.email.trim(),
            password: ''
        });

        user.setPassword(req.body.password);
        const savedUser = await user.save();

        if (!savedUser) {
            return res.status(400).json({ message: 'User registration failed.' });
        }

        const token = user.generateJWT();
        return res.status(200).json({ token });
    } catch (error) {
        return res.status(500).json({ message: 'Server error during registration.', error: error.message });
    }
};

const login = (req, res) => {
    const validationError = validateLoginPayload(req.body);

    if (validationError) {
        return res.status(400).json({ message: validationError });
    }

    // Delegate authentication to passport module
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(500).json({ message: 'Authentication error.', error: err.message });
        }

        if (user) {
            const token = user.generateJWT();
            return res.status(200).json({ token });
        }

        return res.status(401).json({ message: info && info.message ? info.message : 'Invalid email or password.' });
    })(req, res);
};

// Export methods that drive endpoints.
module.exports = {
    register,
    login
};