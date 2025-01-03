const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
;const router = express.Router()
const { PORT = 3001 } = process.env



// i will create user routs on project root
app.get('/api/users', (reg, res) => {
  res.status(200).json({ message: 'get all users' })
})
app.post('/api/users/', (reg, res) => {
  res.status(200).json({ message: 'create user' })
})
//

mongoose.connect('mongodb://127.0.0.1:27017/wtwr_db')
.then(() => {
  console.log('db connected');
}).catch(console.error);
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`)
})
