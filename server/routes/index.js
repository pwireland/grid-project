var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

var ctrlGrid = require('../controllers/grid');
var ctrlAuth = require('../controllers/authentication');
var ctrlSupplier = require('../controllers/supplier-management');

// grid
router.get('/grid', auth, ctrlGrid.gridRead);

// suppliers management
router.get('/supplier-management', auth, ctrlSupplier.supplierManagementRead);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;