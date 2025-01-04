const express = require('express');
const router = express.Router();


//GET ALL THE USERS
router.get("/users", (req, res) => {
  res.status(200).json({ message: 'get all users' });
});

//router.get('/users/:id', (req, res) => {
 // res.status(200).json({ message: 'get user by ID' (req.params) });
//});
// CREATE NEW USER
router.post('/users', (reg, res) => {
  res.status(200).json({ message: 'new user is created' });
})

module.exports = router;