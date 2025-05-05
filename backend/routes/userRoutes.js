const express = require('express')
const router = express.Router();
const {authenticateToken} = require('../utils/token.js');
const { createUser, loginUser, getUser } = require('../controllers/userController.js');


// create_user
router.post('/signup', createUser)
// login_user
router.post('/login', loginUser)
// get User
router.get('/', authenticateToken, getUser);


module.exports = router;
