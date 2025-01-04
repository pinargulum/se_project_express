const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
//const router = require("./routes/users.js")
const { PORT = 3001 } = process.env;

//  USER ROUTERS
app.use("/users", require("./routes/users"));



mongoose.connect('mongodb://127.0.0.1:27017/wtwr_db')
.then(() => {
  console.log('db connected');
}).catch(console.error);
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`)
})
