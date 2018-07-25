var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.gridRead = function (req, res) {

    // If no user ID exists in the JWT return a 401
    if (!req.payload._id) {
        res.status(401).json({
            "message": "UnauthorizedError: must be logged in"
        });
    } else {
        // Otherwise continue
        User
            .findById(req.payload._id)
            .exec(function (err, user) {
                res.status(200).json(user);
            });
    }

};