const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    id: {type: String, unique: true},
    name: String,
    password: String,
    picture: String,
    description: String,
    followers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    reports: [String]
});

const User = mongoose.model('User', userSchema);

module.exports = User;