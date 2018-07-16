// required
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// schema for suppliers
var supplierSchema = new Schema({
    name: String
});

var Supplier = mongoose.model('Supplier', supplierSchema);

module.exports = Supplier;