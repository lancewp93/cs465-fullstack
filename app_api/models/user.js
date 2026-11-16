const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/authConfig');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    hash: String,
    salt: String
});

/**
 * Generates a cryptographic salt and hashes the provided password using PBKDF2.
 * The salt and hash are stored separately to enable password verification.
 * 
 * Uses PBKDF2 with SHA-512 and a configurable number of iterations to create
 * a computationally expensive hash that resists brute-force attacks.
 */
userSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(
        password,
        this.salt,
        authConfig.PBKDF2_ITERATIONS,
        authConfig.PBKDF2_HASH_LENGTH,
        authConfig.PBKDF2_DIGEST
    ).toString('hex');
};

/**
 * Verifies a plaintext password against the stored hash.
 * Hashes the provided password using the stored salt and compares it
 * to the stored hash to determine if the password is correct.
 */
userSchema.methods.validPassword = function(password) {
    const hash = crypto.pbkdf2Sync(
        password,
        this.salt,
        authConfig.PBKDF2_ITERATIONS,
        authConfig.PBKDF2_HASH_LENGTH,
        authConfig.PBKDF2_DIGEST
    ).toString('hex');
    return this.hash === hash;
};

/**
 * Generates a JSON Web Token (JWT) for the current user.
 * 
 * The token encodes user information (_id, email, name) and is signed with a secret key.
 * Tokens are time-limited and will expire after the configured expiration time.
 * 
 * The token is signed using the JWT_SECRET from environment variables and expires
 * according to the JWT_EXPIRY configuration (default: 1 hour).
 * 
 * Expired tokens will fail verification and require the user to re-authenticate.
 */
userSchema.methods.generateJWT = function() {
    return jwt.sign(
        {
            _id: this.id,
            email: this.email,
            name: this.name,
        },
        process.env.JWT_SECRET,
        { expiresIn: authConfig.JWT_EXPIRY }
    );
};

const User = mongoose.model('users', userSchema);
module.exports = User;