const ErrorHandler = require("../utils/errorHandler");
const { hashToken } = require("../utils/hashToken");
const  User = require("../models/authModel");
const crypto = require("crypto");
const { sendToken } = require("../utils/jwtToken");

exports.createUser = async (req, res, next) => {

    try{
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return next(new ErrorHandler("Please enter all fields", 400));
          }

          const existingUser = await User.findOne({ email });

          if (existingUser) {
            return next(new ErrorHandler("User already exists", 400));
          }

          const user = await User.create({
            name: name,
            email: email,
            password: password,
          });



        
        const verificationToken = crypto.randomBytes(32).toString("hex") + user._id;

        const hashedToken = hashToken(verificationToken);

        res.status(200).json({
          success: true,
          message: "User registered successfully",
          data: user,
        });
    } catch(err){
        console.log(err);
        next(err )
    }
}


exports.loginUser = async (req, res, next) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return next(new ErrorHandler("Please provide all the fields", 400));
      }
  
      const user = await User.findOne({ email }).select("+password");
  
      if (!user) {
        return next(new ErrorHandler("User doesn't exist", 404));
      }
  
  
      const isPasswordValid = await user.comparePassword(password);
  
      if (!isPasswordValid) {
        return next(new ErrorHandler("Wrong Password", 400));
      }
  
      sendToken(user, 200, res);
    } catch (error) {
      console.error(error.message);
      return next(new ErrorHandler("Failed to login user", 500));
    }
  };


  exports.getUser = async (req, res, next) => {
    try {
      const userId = req.user.id;
      const user = await User.findById(userId);
  
      if (!user) {
        return next(new ErrorHandler("User does't exist", 404));
      }
  
      res.status(200).json({ success: true, user });
    } catch (error) {
      console.log(error);
      return next(new ErrorHandler(error.message, 500));
    }
  };


  exports.logOutUser = async (req, res, next) => {
    try {
      res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });
  
      res.status(201).json({ success: true, message: "Log out Successful!" });
    } catch (error) {
      console.log(error);
      next(new ErrorHandler(error.message, 500));
    }
  };