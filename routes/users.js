const express = require("express");

const router = express.Router();

const auth = require("../middlewares/auth");

const {
  
  getUsers,
  getCurrentUser,
  updateProfile,
} = require("../controllers/usersController");

router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, updateProfile)
router.get("/", getUsers);

module.exports = router;
