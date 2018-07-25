var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.supplierManagementRead = function (req, res) {

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
                if (user.role != 'Admin') {
                    res.status(401).json({
                        "message": "UnauthorizedError: must be an administrator"
                    });
                } else {
                    res.status(200).json(user);
                }
            });
    }

};