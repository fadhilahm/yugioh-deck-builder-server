if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./routes");
const { errorHandler } = require("./middlewares/errorHandler");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(routes);
app.use(errorHandler);

app.listen(process.env.PORT, () =>
  console.log(`I love you ${process.env.PORT}.`)
);
