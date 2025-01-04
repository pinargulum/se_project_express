// GET ALL THE USERS
const getUsers = (req, res) => {
  res.status(200).json({ message: 'get all users' })
}
// GET SINGLE USER
const getUser = (req, res) => {
  res.status(200).json({ message: `get user by id ${req.params.id}` })
}
// POST NEW USER
const createUser = (req, res) => {


  console.log("The request body is :", req.body);
  const { name, about, avatar } = req.body;
  if (!name || !about || !avatar) {
    res.status(400)
    //throw new Error('All the fields are mendetory!')
  }
  res.status(201).json({ message: "new user created" })
}

module.exports = { getUsers, getUser, createUser }
