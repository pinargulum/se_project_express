const User = require('../models/user')


// GET ALL THE USERS
const getUsers = (req, res) => {
  User.find({})
    .then(users => {
      res.status(200).send(users)
    })
    .catch(err => {
      console.error(err)
        res.status(404).send({ message: err.message })
      })
}

// GET SINGLE USER
const getUser = (req, res) => {
  const { userId } = req.params
  User.findById(userId)
  .orFail()
    .then((user) => {
      res.status(200).send(user)
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: err.message });
      }
      return res.status(500).send({ message: err.message });
    });
};


// POST NEW USER
const createUser = (req, res) => {
  const { name, avatar } = req.body
  User.create({ name, avatar })
    .then(user => {
      res.status(201).send(user)
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: err.message });
      }
      return res.status(500).send({ message: err.message });
    });
};

module.exports = { getUsers, getUser, createUser }
