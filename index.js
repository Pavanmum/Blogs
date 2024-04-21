const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require('cors')
const logger = require("morgan");
const ErrorHandler = require("./utils/errorHandler");
require("dotenv").config();
const connectDatabase = require("./database/dataBase");
connectDatabase();

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




app.get('/', (req, res) => {
  const message = {
    status: 'success',
    code: 200,
    message: 'Welcome To Blog api',
    data:
      mongoose.connection.readyState === 1
        ? 'Connected to MongoDB'
        : 'Not connected to MongoDB',
  };

  res.status(200).json(message);
});


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


process.on("unhandledRejection", (err) => {
  console.log(`Shutting down the server for ${err.message}`);
  console.log(`Shutting down the server for unhandle promise rejection`);

  server.close(() => {
    process.exit(1);
  });
});

const server = app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});


module.exports = app;