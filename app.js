const express = require("express");
const { default: mongoose } = require("mongoose");
const mainRouter = require("./routes/index");
const cors = require("cors");
const auth = require("./middlewares/auth.js");

const app = express();
const { PORT = 3001 } = process.env;
mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("db is connected");
  })
  .catch(console.error);
/*
app.use((req, res, next) => {
  req.user = {
    _id: "677c954c8232ce9d7a9bb172",
  };
  next();
});
*/
app.use(cors());
app.use(express.json());
app.use("/", mainRouter);
app.use("/", auth);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
