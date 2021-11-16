import mongoose from 'mongoose';

const comment = new mongoose.Schema({
    commenter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    article: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "articles",
        required: true
    },
    originalPoster: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    text: {
        type: String,
        required: true
    },
    upvotes: {
        type: Number,
        default: 0
    }
},
{
    timestamps: true
});

export default mongoose.model('Comments', comment);