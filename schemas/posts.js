const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    _id: String,
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    date: Date
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
