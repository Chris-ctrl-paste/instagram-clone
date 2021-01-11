const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const userSchema = new mongoose.Schema({

    name: {
        type:String,
        require:true
    },
    email: {
        type:String,
        require: true
    },
    password: {
        type: String,
        require: true
    },

    resetToken:String,
    expireToken:Date,
    pic: {
        type:String,
        default: "https://i.pinimg.com/originals/ae/19/76/ae1976d2f06032bd56fbb0005b14c992.png"
    },
    followers:[{type:ObjectId, ref: "User"}],
    following:[{type:ObjectId, ref: "User"}]


})


mongoose.model("User", userSchema)