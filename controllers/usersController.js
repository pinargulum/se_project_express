const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const User = require("../models/user");

const BadRequestError = require("../middlewares/errors/BadRequestError");

const ConflictError = require("../middlewares/errors/ConflictError");

const NotFoundError = require("../middlewares/errors/NotFoundError");

const UnauthorizedError = require("../middlewares/errors/UnauthorizedError");

const ServerError = require("../middlewares/errors/ServerError");

const { JWT_SECRET } = require("../utils/config");

const getCurrentUser = (req, res, next) => {
  const userId = req.user;
  User.findById(userId)
    .orFail(() => {
      throw new NotFoundError("No user with matching ID found");
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("The id string is in an invalid format"));
      } else {
        next(new ServerError("An error has occurred on the server."));
      }
    });
};

const updateProfile = (req, res, next) => {
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
      if (err.name === "ValidationError") {
        next(new BadRequestError("Please fill all the requred fields"));
      } else {
        next(new ServerError("An error has occurred on the server."));
      }
    });
};

// create a user
const createUser = (req, res, next) => {
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
        next(new BadRequestError("Please complete all mandatory fields."));
      } else if (err.code === 11000) {
        next(new ConflictError("Email already in use."));
      } else {
        next(new ServerError("An error has occurred on the server."));
      }
    });
};
const login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please fill all the requred fields");
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
        next(new UnauthorizedError("invalid password or email"));
      } else {
        next(new ServerError("An error has occurred on the server."));
      }
    });
};

module.exports = { getCurrentUser, createUser, login, updateProfile };
