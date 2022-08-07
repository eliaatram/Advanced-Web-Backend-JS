const mongoose = require('mongoose')

const ratingSchema = new mongoose.Schema({
    rating: {
        type: Number,
        trim: true,
    },
    commentTitle: {
        type: String,
        required: 'Comment title is required',
        trim: true
    },
    commentContent: {
        type: String,
        required: 'Comment is required',
        trim: true
    },
    userId: {
        type: Number,
    },
    movieId: {
        type: Number
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

module.exports = mongoose.model('Rating', ratingSchema)