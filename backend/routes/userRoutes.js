const express = require('express');
const router = express.Router();
const { register, login, invest } = require('../controllers/userController');

router.post('/register', register);
router.post('/login', login);
router.post('/invest', invest);

module.exports = router;