const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const User = require("../models/user");

const {
  SERVER_ERROR,
  VALIDATION_ERROR,
  NOT_FOUND,
  UNAUTHORIZED
} = require("../utils/constants");

const { JWT_SECRET } = require("../utils/config");

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
const updateProfile = (req, res) => {
  const userId = req.user;
  const { name, avatar } = req.body;
  if (!name && !avatar ) {
    return res
      .status(VALIDATION_ERROR)
      .send({ message: "name or avatar must be provided" });
  }
  return User.findByIdAndUpdate(
    userId,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .then((updatedProfile) => {
      return res.status(200).send(updatedProfile);
    })
    .catch((err) => {
      console.error(err);
      if (!updateProfile) {
        return res.status(NOT_FOUND).send({ message: "User not found" });
      }
    });
  return res
    .status(SERVER_ERROR)
    .send({ message: "An error has occurred on the server." });
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
      const resposeUser = user.toObject();
      delete resposeUser.password;
      res.status(201).send(resposeUser);
    })

    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(VALIDATION_ERROR)
          .send({ message: "Please complete all mandatory fields." });
      }
      return res
        .status(UNAUTHORIZED)
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
      return res.status(UNAUTHORIZED).send({ message: err.message });
    });
};

module.exports = { getUsers, getCurrentUser, createUser, login, updateProfile };
