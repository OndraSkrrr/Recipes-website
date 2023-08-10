const Mongoose = require("mongoose")
const {Schema, model} = Mongoose;
const RecipeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    complexity: {
        type: Number,
    },
    ingredients: {
        type: String,
    },
    thumbnail: {
        type: String,
    },
    content: {
        type: String,
    },
    author: {
        type: Schema.Types.ObjectId, 
        ref:'User'
    },
},

    { timestamps: true })

const Recipe = model("recipe", RecipeSchema)
module.exports = Recipe