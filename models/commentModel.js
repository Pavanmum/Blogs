const mongoose = require('mongoose');


const commentSchema = new mongoose.Schema({
    article_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Article'
    },
    comments: {
        type: String,
        required: true
    },
    author: {
       type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
    },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
