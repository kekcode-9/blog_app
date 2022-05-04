import mongoose from 'mongoose';

const user = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        default: '',
        unique: true
    },
    email : {
        type: String,
        default: ''
    },
    bio: {
        type: String,
        default: ''
    },
    avatar: {
        type: String,
        default: ''
    },
    following: {
        type: Number,
        default: 0
    },
    followedBy: {
        type: Number,
        default: 0
    },
    password: {
        type: String,
        required: true
    }
});

export default mongoose.model('Users', user);