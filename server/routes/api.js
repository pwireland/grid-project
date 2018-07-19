const express = require('express');
const router = express.Router();

// Mongoose import
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/equipmentdb');

const Led = require('../models/led.js');
const Supplier = require('../models/supplier.js');

// GET api listing.
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

/*********************************************/
/*                  LEDS                     */
/*********************************************/

// Get ALL leds
router.get('/leds', (req, res) => {
    Led.find({}, '-_id -__v', { sort: { wafer_n: 'asc' } }, function (err, leds) {
        if (err) return err;
        console.log('Leds fetched');
        res.status(200).json(leds);
    });
});

// Add a new led into the database
// router.post('/leds/add', (req, res) => {
//     let newLed = Led(req.body);

//     newLed.save(function (err) {
//         if (err) return err;
//         console.log('Led created!');
//         res.status(200).json();
//     });
// });

// Update a led in the database or Create a new one if it doesn't exist
router.post('/leds/update', (req, res) => {
    const newValues = req.body;
    if (req.body.wafer_n >= 0) {
        Led.update({ wafer_n: req.body.wafer_n }, newValues, { upsert: true }, function (err, raw) {
            if (err) res.status(500).json();
            console.log('Led updated!');
            res.status(200).json();
        });
    };
});

// Remove a led from the database
router.post('/leds/remove', (req, res) => {
    const number = req.body.wafer_n;        // Save wafer_n to display later
    Led.deleteOne(req.body, function (err, raw) {
        if (err) throw (err);
        console.log('Led ' + number + ' removed!');
        res.status(200).json();
    });
});

// Clear (!!) ALL leds in the database
router.post('/leds/removeAll', (req, res) => {
    Led.deleteMany({}, function (err, raw) {
        if (err) throw (err);
        console.log('EVERYTHING removed!');
        res.status(200).json();
    });
});

/*********************************************/
/*                SUPPLIERS                  */
/*********************************************/

// Gets all suppliers
router.get('/suppliers', (req, res) => {
    Supplier.find({}, null, { sort: { name: 'asc' } }, function (err, suppliers) {
        if (err) throw err;
        console.log('Suppliers fetched');
        res.status(200).json(suppliers);
    });
});

// Adds a new supplier
router.post('/suppliers/add', (req, res) => {
    const newValues = req.body;
    Supplier.update({name: newValues.name}, newValues, { upsert: true }, function (err) {
        if (err) throw err;
        console.log('Supplier created!');
        res.status(200).json();
    });
});

// Removes the supplier from the database
router.post('/suppliers/remove', (req, res) => {
    const name = req.body.name;        // Save supplier's name to display later
    Supplier.deleteOne(req.body, function (err, raw) {
        if (err) throw (err);
        console.log(name + ' supplier removed!');
        res.status(200).json();
    });
});

module.exports = router;