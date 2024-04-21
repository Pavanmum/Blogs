const router = require("express").Router();
const { createUser, loginUser, getUser, logOutUser } = require("../controllers/authController");
const { isVerify } = require("../middleware/auth");
const catchAsyncError = require("../middleware/catchAsyncError");



router.post("/signup", catchAsyncError(createUser))
router.post("/login", catchAsyncError(loginUser))
router.get("/get-user",isVerify, catchAsyncError(getUser))
router.get("/logout", logOutUser)


module.exports = router;