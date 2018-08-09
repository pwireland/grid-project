var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.register = function (req, res) {
    const user = new User();

    user.username = req.body.name;

    user.email = req.body.email;

    user.setPassword(req.body.password);

    user.save(function (err) {
        if (err) {
            res.status(401).json('User or email address already existing.')
        } else {
            let token;
            token = user.generateJwt();
            res.status(200);
            res.json({
                "token": token
            });
        }
    });
};

module.exports.login = function (req, res) {

    passport.authenticate('local', function (err, user, info) {
        let token;

        // If Passport throws/catches an error
        if (err) {
            res.status(404).json(err);
            return;
        }

        // If a user is found
        if (user) {
            console.log(user);
            token = user.generateJwt();
            res.status(200);
            res.json({
                "token": token
            });
        } else {
            // If user is not found
            res.status(401).json(info);
        }
    })(req, res);
};

module.exports.changePassword = function (req, res) {

    User.findOne({ username: req.body.username }, function (err, user) {
        if (err) res.status(404).json(err);

        // If user is not found
        if (!user) {
            res.status(404).json('User not found.');
            return;
        }

        // If password in not valid
        if (!user.validPassword(req.body.currentPassword)) {
            res.status(401).json('Current password is incorrect.');
            return;
        }
        
        // If new password and confirmation do not match
        if (req.body.newPassword !== req.body.confirm) {
            res.status(401).json('Confirmation password does not match.');
            return;
        }
        
        user.setPassword(req.body.newPassword);

        user.save(function (err) {
            let token;
            token = user.generateJwt();
            res.status(200);
            res.json({
                "token": token
            });
        });
    });
};