// required
var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var Schema = mongoose.Schema;

// schema for suppliers
var userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    hash: String,
    salt: String,
    role: {enum: ['Normal', 'Admin'], required: true, default: 'Normal'}
});

/**
 * Hashes the password and store the hash into the model.
 * @param {*} password The password to store.
 */
userSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

/**
 * Checks if the password corresponds to the one stored in the model.
 * @param {*} password The password to check.
 */
userSchema.methods.validPassword = function (password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
};

/** 
 * Generates a navigation token for the user on log-in. 
 */
userSchema.methods.generateJwt = function () {

    return jwt.sign({
        _id: this._id,
        username: this.username,
        exp: '1h',      // Session expires after 1 hour
    }, "MY_SECRET");    // DO NOT KEEP YOUR SECRET IN THE CODE!
};

var User = mongoose.model('User', userSchema);

module.exports = User;