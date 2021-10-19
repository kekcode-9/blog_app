import mongoose from 'mongoose';

const article = new mongoose.Schema({
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
        ref: "users",
        required: true
    },
    authorName: {
        type: String,
        required: true
    },
    upvotes: {
        type: Number,
        default: 0
    },
    tags: {
        type: Array,
        default: ['general']
    }
}, {
    timestamps: true
});

export default mongoose.model('Articles', article);