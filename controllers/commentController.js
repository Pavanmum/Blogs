const authModel = require("../models/authModel");
const ErrorHandler = require("../utils/errorHandler");
const Comment = require("../models/commentModel");

exports.createComment = async (req, res, next) => {
    try{
        const userId = req.user.id;
        const articleId = req.params.id;
        const user = await authModel.findById(userId);
        if(!user){
            return next(new ErrorHandler("User not found", 404));
        }
        const {comments} = req.body;
        // const article = await Comment.findOne({author: user._id})
        // if(article){
        //     return next(new ErrorHandler("You have already commented on this article", 400));
        // }
        const comment = await Comment.create({
            author: user._id,
            article_id : articleId,
            comments,
            });
        res.status(201).json({
            success: true,
            message: "Comment created successfully",
            data: comment,
        });
    } catch (err) {
        console.log(err.message);
        return next(new ErrorHandler(err.message, 500));
    }
}

exports.fetchComment = async (req, res, next) => {
    try{
        const userId = req.user.id;

        const id = req.params.id;

        const user = await authModel.findById(userId);
        if(!user){
            return next(new ErrorHandler("User not found", 404));
        }
        const comment = await Comment.find({article_id : id}).populate({
            path:"author",
            select:"name email"
        })
        res.status(200).json({
            success: true,
            message: "Comment fetched successfully",
            data: comment,
        });
    } catch (err) {
        console.log(err.message);
        return next(new ErrorHandler(err.message, 500));
    }
}
