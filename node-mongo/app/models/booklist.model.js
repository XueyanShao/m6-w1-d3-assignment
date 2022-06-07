const mongoose = require('mongoose');

const BooklistSchema = new mongoose.Schema({
    id: String,
    title: String,
    author: String,
    status: String
});

module.exports = mongoose.model('Booklist', BooklistSchema);