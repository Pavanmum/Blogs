const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require('cors')
const logger = require("morgan");
const path = require('path')
const ErrorHandler = require("./utils/errorHandler");
require("dotenv").config();
const connectDatabase = require("./database/dataBase");
connectDatabase();

const app = express();


app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());




const authRoutes = require("./routes/authRoutes");
const articleRoutes = require("./routes/articleRoutes");
const commentRoutes = require("./routes/commentRoutes");


app.use('/api/v1', authRoutes);
app.use('/api/v1/article', articleRoutes);
app.use('/api/v1/comment', commentRoutes);


app.get("/", (req, res) => {
  app.use(express.static(path.resolve(__dirname, "frontend", "build")));
  res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";
  res.status(errorStatus).send(errorMessage);
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


process.on("unhandledRejection", (err) => {
  console.error(`Unhandled Promise Rejection: ${err}`);
  process.exit(1);
});
