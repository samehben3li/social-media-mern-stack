const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        min: 6,
        required: true
    },
    image: {
        type: String,
        default: ""
    },
    imgCover: {
        type: String,
        default: ""
    },
    followers: {
        type: Array,
        default: []
    },
    followings: {
        type: Array,
        default: []
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    desc: {
        type: String,
        max: 50,
        default: ""
    },
    city: {
        type: String,
        default: ""
    },
    from: {
        type: String,
        default: ""
    },
    relationship: {
        type: Number,
        enum: [1, 2, 3]
    },
    notifications: {
        type: Array,
        default: []
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("User", userSchema)