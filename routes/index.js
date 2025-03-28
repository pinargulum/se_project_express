const express = require("express");

const router = express.Router();

const userRauter = require("./users");

const itemRauter = require("./clothingItems");

const NotFoundError = require("../middlewares/errors/NotFoundError");

const { login, createUser } = require("../controllers/usersController");

const { validateSignup, validateSigin } = require("../middlewares/validation");

router.use("/users", userRauter);
router.use("/items", itemRauter);
router.post("/signin", validateSigin, login);
router.post("/signup", validateSignup, createUser);

router.use((req, res, next) => {
 throw new NotFoundError("Page not found");
});

module.exports = router;
