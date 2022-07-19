const mongoose = require("mongoose")


const productSchema = mongoose.Schema({
    idUser: String,
    name: String,
    imageUrl :String,
    price: Number,
    description: String,
    color: String,
    style: String,
    madeIn: String

    
},);

const Product = mongoose.model("product", productSchema);

module.exports = { Product };