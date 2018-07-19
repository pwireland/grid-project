// required
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// schema for leds
var ledSchema = new Schema({
    wafer_n: String,
    led_n: String,
    date: String,
    supplier: String,
    supplier_pin: String,
    lot_n: String,
    bin_n: String,
    qty_wafer: Number,
    manufacturing_date: String,
    test_current: String,
    min: Number,
    average: Number,
    max: Number,
    units: String,
    status: {type: String, default: "Pending"}
});

var Led = mongoose.model('Led', ledSchema);

module.exports = Led;