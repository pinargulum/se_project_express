const express = require("express");

const router = express.Router();

const auth = require("../middlewares/auth");

  const { validateUpdateProfile } = require("../middlewares/validation")

const {
  getCurrentUser,
  updateProfile,
} = require("../controllers/usersController");

router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, validateUpdateProfile, updateProfile)


module.exports = router;
