const express = require('express');
const router = express.Router();
const { getUsers, getUser, createUser } = require('../controllers/usersController');



//GET ALL THE USERS
router.route("/").get(getUsers);
// GET USER BY ID
router.route('/:id').get(getUser);

// CREATE NEW USER
router.route('/').post(createUser);

module.exports = router;