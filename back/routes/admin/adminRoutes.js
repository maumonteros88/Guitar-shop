const express = require('express');
const router = express.Router();

const admin = require('../../controller/adminController');

router.get('/', admin.adminIndex);
router.post('/registerAdmin', admin.registerAdmin);

module.exports = router;
