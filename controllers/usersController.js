

// GET ALL THE USERS
const getUsers = ((req, res) => {
  res.status(200).json({ message: 'get all users' });
});
// GET SINGLE USER
const getUser = ((req, res) => {
  res.status(200).json({ message: `get user by id ${req.params.id}` });
 });
 // POST NEW USER
const createUser = ((reg, res) => {
  res.status(201).json({ name: 'String', avatar: 'String' });
});

module.exports = { getUsers, getUser, createUser };