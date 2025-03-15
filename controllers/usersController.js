const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const User = require("../models/user");

const BadRequestError = require("../middlewares/errors/BadRequestError");
const ConflictError = require("../middlewares/errors/ConflictError");
const ForbiddenError = require("../middlewares/errors/ForbiddenError");
const NotFoundError = require("../middlewares/errors/NotFoundError");
const UnauthorizedError = require("../middlewares/errors/UnauthorizedError");
const ServerError = require("../middlewares/errors/ServerError");

const { JWT_SECRET } = require("../utils/config");

const getCurrentUser = (req, res) => {
  const userId = req.user;
  User.findById(userId)
    .orFail(() => {
      throw new NotFoundError("No user with matching ID found");
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
};

const updateProfile = (req, res) => {
  const userId = req.user;
  const { name, avatar } = req.body;
  return User.findByIdAndUpdate(
    userId,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        next(new BadRequestError("Please fill all the requred fields"));
      } else {
        next(err);
      }
    });
};

// create a user
const createUser = (req, res) => {
  const { email, name, avatar } = req.body;
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => User.create({ email, password: hash, name, avatar }))
    .then((user) => {
      const resposeUser = user.toObject();
      delete resposeUser.password;
      res.status(201).send(resposeUser);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        next(new BadRequestError("Please fill all the requred fields"));
      } else {
        next(err);
      }
    });
};
const login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("The email and password fields are required");
  }
  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: jwt.sign({ _id: user._id }, JWT_SECRET, {
          expiresIn: "7d",
        }),
      });
    })
    .catch((err) => {
      console.error(err);
      if (err.message === "Incorrect email or password") {
        next(new UnauthorizedError("Please fill all the requred fields"));
      } else {
        next(err);
      }
    });
};

module.exports = { getCurrentUser, createUser, login, updateProfile };
