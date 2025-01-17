const express = require('express')

const router = express.Router()

const auth = require('../middlewares/auth');

const {
  login,
  getUsers,
  getCurrentUser,
  createUser
} = require('../controllers/usersController');


router.post('/signin', login);
router.post("/signup", createUser)//public

router.get("/me", auth, getCurrentUser)

router.get("/", getUsers)



module.exports = router