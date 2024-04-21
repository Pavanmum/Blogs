const router = require("express").Router();
const { createArticle, getArticle, getIdArticle, updateArticle, deleteArticle, getArticleById } = require("../controllers/articleController");
const { createUser, loginUser, getUser, logOutUser } = require("../controllers/authController");
const { upload } = require("../helper/uploadFile");
const { isVerify } = require("../middleware/auth");
const catchAsyncError = require("../middleware/catchAsyncError");

router.post("/create-article",isVerify,upload.single("featuredImage"),catchAsyncError(createArticle))
router.get("/get-article", catchAsyncError(getArticle))
router.get("/get-user-article",isVerify, catchAsyncError(getIdArticle))
router.put("/update-article/:id",isVerify,upload.single("featuredImage"),catchAsyncError(updateArticle))
router.delete("/article-delete/:id",isVerify,catchAsyncError(deleteArticle))
router.get("/get-article/:id",catchAsyncError(getArticleById))


module.exports = router;
