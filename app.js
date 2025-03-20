const express = require("express");
const { default: mongoose } = require("mongoose");
const cors = require("cors");
const helmet = require('helmet')
const { errors } = require('celebrate');
const mainRouter = require("./routes/index");

const { requestLogger, errorLogger } = require('./middlewares/logger');



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
app.use(requestLogger);
app.use("/", mainRouter);
app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
  console.error(err);
res.status(err.statusCode).send({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
