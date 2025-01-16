const User = require("../models/user");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const {
  SERVER_ERROR,
  VALIDATION_ERROR,
  NOT_FOUND,
} = require("../utils/constants");

const login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(VALIDATION_ERROR)
      .send({ message: "Email and password are required" })
  }
  User.findUserByCredentials(email, password)
  .then((user) => {
    User.findOne({ email });
    if (!user) {
      return res.status(NOT_FOUND).send({ message: "User not found" });
    }
    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(VALIDATION_ERROR)
        .send({ message: "Invalid password" });
    }
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.status(200).send({ message: "Login Succesful", token })
    })

    .catch((err) => {
      res.status(SERVER_ERROR).send({ message: "Please login to continue" });
    });
};
// GET ALL THE USERS
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

// GET SINGLE USER
const getUser = (req, res) => {
  const { userId } = req.params;
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

// POST NEW USER
const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;
  User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        return res
          .status(VALIDATION_ERROR)
          .send({ message: "Email already exist." });
      }
      bcrypt
        .hash(req.body.password, 10)
        .then((hash) => User.create({ name, avatar, email, password: hash }))
        .then((user) => {
          res.status(201).send(user);
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

module.exports = { login, getUsers, getUser, createUser };
