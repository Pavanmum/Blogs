const mongoose = require('mongoose');


const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
    },
    category: {
        type: String,
        required: true
    },
    featuredImage: {
        type: String,
    },
    tags: [String]
},{timestamps:true});


const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
