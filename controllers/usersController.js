const User = require("../models/user");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth");

const {
  SERVER_ERROR,
  VALIDATION_ERROR,
  NOT_FOUND,
} = require("../utils/constants");

const { JWT_SECRET } = require("../utils/config")
console.log(JWT_SECRET)



// get all the users
const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => {
      console.error(err);
      return res
        .status(SERVER_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};


const getCurrentUser = (req, res) => {
  const userId = req.user;
  User.findById(userId)
    .orFail(() => {
      const error = new Error("User not found");
      error.name = "NotFoundError";
      throw error;
    })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "NotFoundError") {
        return res
          .status(NOT_FOUND)
          .send({ message: "User information not found" });
      }
      if (err.name === "CastError") {
        return res
          .status(VALIDATION_ERROR)
          .send({ message: "Please complete all mandatory fields." });
      }
      return res
        .status(SERVER_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};

// create a user
const createUser = (req, res) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) =>
      User.create({
        name: req.body.name,
        avatar: req.body.avatar,
        email: req.body.email,
        password: hash,
      })
    )
    .then((user) => {
      res.status(201).send({
        _id: user._id,
        name: user.name,
        password: user.password,
        email: user.email,
      });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(VALIDATION_ERROR)
          .send({ message: "Please complete all mandatory fields." });
      }
      return res
        .status(SERVER_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: jwt.sign({ _id: user._id }, JWT_SECRET, {
          expiresIn: "7d",
        }),
      });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};

module.exports = { getUsers, getCurrentUser, createUser, login };
