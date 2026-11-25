const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const protectedController = require('../controllers/protectedController')


router.get('/hello', authMiddleware, protectedController.hello)


module.exports = router;

