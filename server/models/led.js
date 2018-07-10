// required
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// schema for leds
var ledSchema = new Schema({
    wafer_n: Number,
    led_n: String,
    date: Date,
    supplier: String,
    supplier_pin: String,
    lot_n: String,
    bin_n: String,
    qty_wafer: Number,
    manufacturing_date: Date,
    test_current: String,
    min: Number,
    average: Number,
    max: Number,
    units: String
});

var Led = mongoose.model('Led', ledSchema);

module.exports = Led;