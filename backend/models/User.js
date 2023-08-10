const Mongoose = require("mongoose")
const UserSchema = new Mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        minlength: 6,
        required: true,
    }
},
    { timestamps: true })

const UserModel = Mongoose.model("User", UserSchema)
module.exports = UserModel
