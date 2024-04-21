const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require('cors')
const logger = require("morgan");
const ErrorHandler = require("./utils/errorHandler");
require("dotenv").config();
const app = express();

app.use(express.json());

app.use(cors());

app.use(express.json("urlencoded", { extended: true }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(logger("dev"));

app.use(express.json());
app.use(cookieParser());


// Import routes
const authRoutes = require("./routes/authRoutes");
const articleRoutes = require("./routes/articleRoutes");
const commentRoutes = require("./routes/commentRoutes");


// Use Routes

app.use('/api/v1', authRoutes);
app.use('/api/v1/article', articleRoutes);
app.use('/api/v1/comment', commentRoutes);





app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

app.use((err , req , res ,next ) =>{
  const errorStatus = err.status || 500
  const errorMessage = err.message || "Something went Wrong"

  return res.status(errorStatus).send(errorMessage)

})



module.exports = app;
