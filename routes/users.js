const express = require('express')
const router = express.Router()

const {
  getUsers,
  getUser,
  createUser
} = require('../controllers/usersController')

router.get("/", getUsers)
router.post("/", createUser)
router.get('/:userId', getUser)




module.exports = router