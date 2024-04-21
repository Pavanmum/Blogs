const { generateHashedFileName, uploadToS3WithHash } = require("../helper/uploadFile");
const Article = require("../models/articleModel");
const  User = require("../models/authModel");
const ErrorHandler = require("../utils/errorHandler");



exports.createArticle = async (req, res, next) => {
    try {
        const userId = req.user.id;
        console.log(userId);
        const { title, content, category, tags } = req.body;
         const file = req.file;
         let uploadedFile;
        if (file) {
         uploadedFile = null;
            const hashedName = generateHashedFileName(file.originalname, Date.now());
            uploadedFile = await uploadToS3WithHash(file, hashedName);
        }
        const article = await Article.create({
            title,
            content,
            author: userId,
            category,
            featuredImage:uploadedFile,
            tags,
        });

        res.status(201).json({
            success: true,
            message: "Article created successfully",
            data: article,
        });
}  catch (err) {
        console.log(err.message);
        return next(new ErrorHandler(err.message, 500));
    }
}

exports.getArticle = async (req, res, next) => {
    try {
        const article = await Article.find().populate({
            path: "author",
            select: "name email",
        });
        res.status(200).json({
            success: true,
            data: article,
        });
    } catch (error) {
        console.log(error);
        return next(new ErrorHandler(error.message, 500));
    }
}

exports.getArticleById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const article = await Article.findById(id).populate({
            path: "author",
            select: "name email",
        });
        if (!article) {
            return next(new ErrorHandler("Article not found", 404));
        }
        res.status(200).json({
            success: true,
            data: article,
        });
    } catch (error) {
        console.log(error);
        return next(new ErrorHandler(error.message, 500));
    }

}

exports.getIdArticle = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const author = await User.findById(userId);
        const article = await Article.find({author: author._id}).populate({
            path: "author",
            select: "name email",
        });
        if (!article) {
            return next(new ErrorHandler("Article not found", 404));
        }
        res.status(200).json({
            success: true,
            data: article,
        });
    } catch (error) {
        console.log(error);
        return next(new ErrorHandler(error.message, 500));
    }
}
exports.updateArticle = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updateFields = req.body; 

        const userId = req.user.id;
        const user = await User.findById(userId);

        if (!user) {
            return next(new ErrorHandler("User not found", 404));
        }

      
        if (Object.keys(updateFields).length === 0) {
            return next(new ErrorHandler("No fields to update", 400));
        }

       
        if (req.file) {
            const hashedName = generateHashedFileName(req.file.originalname, Date.now());
            const uploadedFile = await uploadToS3WithHash(req.file, hashedName);
            updateFields.featuredImage = uploadedFile;
        }

        const article = await Article.findByIdAndUpdate(
            id,
            updateFields,
            {
                new: true,
            }
        );

        if (!article) {
            return next(new ErrorHandler("Article not found", 404));
        }

        res.status(200).json({
            success: true,
            data: article,
        });
    } catch (error) {
        console.error(error);
        return next(new ErrorHandler(error.message, 500));
    }
}



exports.deleteArticle = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);
        const {id} = req.params

        if (!user) {
            return next(new ErrorHandler("User not found", 404));
        }
     
        const article = await Article.findByIdAndDelete(id);
        if (!article) {
            return next(new ErrorHandler("Article not found", 404));
        }
        res.status(200).json({
            success: true,
            message: "Article deleted successfully",
        });
    } catch (error) {
        console.log(error);
        return next(new ErrorHandler(error.message, 500));
    }
}


exports.searchCategory = async (req, res) => {
    try {
        const category = req.query;
        const regex = new RegExp(category, "i");
        const searchResult = await Article.find({ category: regex });
        if (!searchResult) {
            return next(new ErrorHandler("Category Not found"));
        }
        res.status(200).json({
            success: true,
            message: "Search successfully",
            data: searchResult,
        });
    } catch (error) {
        console.log(error);
        return next(new ErrorHandler(error.message, 500));
    }
};