const express = require('express');
const router = express.Router();

const usersRoutes = require('./users/usersRoutes');
const homeRoutes = require('./home/homeRoutes');
const adminRoutes = require('./admin/adminRoutes');

router.get('/', (req, res) => {
  if (!req.session.mail) {
    return res.redirect('/users');
  }
  res.redirect('/home');
});

router.use('/users', usersRoutes);
router.use('/home', homeRoutes);
router.use('/admin', adminRoutes);

module.exports = router;
