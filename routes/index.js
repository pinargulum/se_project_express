const express = require("express");

const router = express.Router();

const userRauter = require("./users");

const itemRauter = require("./clothingItems");

const { login, createUser } = require("../controllers/usersController");

const { NOT_FOUND } = require("../utils/constants");

router.use("/users", userRauter);
router.use("/items", itemRauter);
router.post("/signin", login);
router.post("/signup", createUser); 

router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Page not found" });
});

module.exports = router;
