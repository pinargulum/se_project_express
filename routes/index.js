const express = require("express");

const router = express.Router();

const userRauter = require("./users");

const itemRauter = require("./clothingItems");

const { login, createUser } = require("../controllers/usersController");

const { NOT_FOUND } = require("../utils/constants");

const { validateSignup, validateSigin } = require("../middlewares/validation");

router.use("/users", userRauter);
router.use("/items", itemRauter);
router.post("/signin", validateSigin, login);
router.post("/signup", validateSignup, createUser);

router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Page not found" });
});

module.exports = router;
