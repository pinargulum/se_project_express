const User = require('../models/user')

const {
  SERVER_ERROR,
  VALIDATION_ERROR,
  NOT_FOUND
} = require('../utils/constants')

// GET ALL THE USERS
const getUsers = (req, res) => {
  User.find({})
    .then(users => {
      res.status(200).send(users)
    })
    .catch(err => {
      console.error(err)
      return res
        .status(SERVER_ERROR)
        .send({ message: 'An error has occurred on the server.' })
    })
}

// GET SINGLE USER
const getUser = (req, res) => {
  const { userId } = req.params
  User.findById(userId)
    .orFail(() => {
      const error = new Error('User not found')
      error.name = 'NotFoundError'
      throw error
    })
    .then(user => {
      res.status(200).send(user)
    })
    .catch(err => {
      console.error(err)
      if (err.name === 'NotFoundError') {
        return res
          .status(NOT_FOUND)
          .send({ message: 'User information not found' })
      }
      if (err.name === 'CastError') {
        return res
          .status(VALIDATION_ERROR)
          .send({ message: 'Please complete all mandatory fields.' })
      }
      return res
        .status(SERVER_ERROR)
        .send({ message: 'An error has occurred on the server.' })
    })
}

// POST NEW USER
const createUser = (req, res) => {
  const { name, avatar } = req.body
  User.create({ name, avatar })
    .then(user => {
      res.status(201).send(user)
    })
    .catch(err => {
      console.error(err)
      if (err.name === 'ValidationError') {
        return res
          .status(VALIDATION_ERROR)
          .send({ message: 'Please complete all mandatory fields.' })
      }
      return res
        .status(SERVER_ERROR)
        .send({ message: 'An error has occurred on the server.' })
    })
}

module.exports = { getUsers, getUser, createUser }
