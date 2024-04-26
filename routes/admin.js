const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/', adminController.login);
router.post('/login', adminController.handleLogin);

module.exports = router;
