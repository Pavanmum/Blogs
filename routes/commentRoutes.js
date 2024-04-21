const { createComment, fetchComment } = require("../controllers/commentController");
const { isVerify } = require("../middleware/auth");
const catchAsyncError = require("../middleware/catchAsyncError");

const router = require("express").Router();




router.post("/create/:id",isVerify,catchAsyncError(createComment))
router.get("/get/comments/:id" ,isVerify,catchAsyncError(fetchComment))


module.exports = router;