const express = require('express');
const router = express.Router();

const users = require('../../controller/usersController');

router.get('/', users.index);
router.post('/auth', users.auth);
router.get('/register', users.registerIndex);
router.post('/newregister', users.newRegister);
router.get('/logout', users.signOut);

module.exports = router;
