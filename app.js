const express = require("express");
const { default: mongoose } = require("mongoose");
const cors = require("cors");
const helmet = require('helmet')
const mainRouter = require("./routes/index");





const app = express();
const { PORT = 3001 } = process.env;
mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("db is connected");
  })
  .catch(console.error);


app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/", mainRouter);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
