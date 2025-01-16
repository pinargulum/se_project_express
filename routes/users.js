const express = require('express')

const router = express.Router()

const {
  //login,
  getUsers,
  getUser,
  createUser
} = require('../controllers/usersController')
//router.post("/", login)
router.get("/", getUsers)
router.post("/", createUser)
router.get('/:userId', getUser)




module.exports = router