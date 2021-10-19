import { ObjectId } from 'bson';
import mongoose from 'mongoose';

const follows = new mongoose.Schema({
    follower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    follows: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    }
});

export default mongoose.model('Follows', follows);