const express = require('express');
const router = express.Router();

// Mongoose import
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/equipmentdb');

const Led = require('../models/led.js');

/* GET api listing. */
router.get('/', (req, res) => {
    res.send('api works');
});

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

// Get ALL leds
router.get('/leds', (req, res) => {
    Led.find({}, function(err, leds) {
        if (err) throw err;
        console.log('Leds fetched');
        res.status(200).json(leds);
    });
});

// Create a new led
router.post('/leds/add', (req, res) => {
    let newLed = Led(req.body);

    newLed.save(function(err) {
        if (err) throw err;
        console.log('Led created!');
        res.status(200).json();
      });
});

// Update a led or Create a new led if it doesn't exist
router.post('/leds/update', (req, res) => {
    const newValues = req.body;
    if (req.body.wafer_n >= 0) {
        Led.update({ wafer_n: req.body.wafer_n }, newValues, { upsert: true }, function (err, raw) {
            if (err) throw (err);
            console.log('Led updated!');
            res.status(200).json();
        });
    };
});

// Remove a led
router.post('/leds/remove', (req, res) => {
    const number = req.body.wafer_n;        // Save wafer_n to display later
    Led.deleteOne(req.body, function (err, raw) {
        if (err) throw (err);
        console.log('Led ' + number +' removed!');
        res.status(200).json();
    });
});

// Clear (!!) ALL leds
router.post('/leds/removeAll', (req, res) => {
    Led.deleteMany({}, function (err, raw) {
        if (err) throw (err);
        console.log('EVERYTHING removed!');
        res.status(200).json();
    });
});

// Get users
// router.get('/users', (req, res) => {
//     connection((db) => {
//         db.collection('users')
//             .find()
//             .toArray()
//             .then((users) => {
//                 response.data = users;
//                 res.json(response);
//             })
//             .catch((err) => {
//                 sendError(err, res);
//             });
//     });
// });

// router.get('/leds', (req, res) => {
//     connection((db) => {
//         db.collection('leds')
//             .find()
//             .toArray()
//             .then((leds) => {
//                 response.data = leds;
//                 res.json(response);
//             })
//             .catch((err) => {
//                 sendError(err, res);
//             });
//     });
// });

// router.post('/leds', (req, res) => {
//     console.log(req.body);
//     connection((db) => {
//         db.collection('leds')
//             .update(req.body.wafer_n,req.body,{upsert: true})
//             .catch((err) => {
//                 sendError(err, res);
//             });
//     });
// });
//     let led = new Screening(req.body);

//     led.update(function(err) {
//         if (err) throw err;

//         console.log("Led saved!");
//         res.status(200).json();
//     });
// });

module.exports = router;