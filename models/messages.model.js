const mongoose = require("mongoose")


const messageSchema = mongoose.Schema({
  

    idUser: String,
    name: String,
    imageUrl :String,
    price: Number,
    description: String,
    color: String,
    style: String,
    madeIn: String
    
}, {
    timestamps: true
});

const Message = mongoose.model("message", messageSchema);

module.exports = { Message };