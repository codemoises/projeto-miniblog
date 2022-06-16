const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    id: String,
    ownerId: String,
    likes: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    shares: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
    timestamp: Date,
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
    content: String,
    media: String,
    isReply: Boolean,
    reports: [String]
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;