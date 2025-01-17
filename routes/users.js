const express = require('express')

const router = express.Router()

const {
  login,
  getUsers,
  getCurrentUser,
  createUser
} = require('../controllers/usersController')


router.get("/", getUsers)
router.get('/users/me', getCurrentUser)
router.post('/signin', login);
router.post("/signup", createUser)




module.exports = router