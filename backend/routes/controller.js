const express = require("express");
const router = express.Router();
var compression = require('compression')
const auth = require('./auth');
const todo= require('./todo');
router.use('/todo',todo);
router.use('/auth', auth);

module.exports = router;