const mongoose = require("mongoose")


const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    birthDate: String,
    address: String,
    phoneNumber: Number,
    
}, {
    timestamps: true
});

const User = mongoose.model("user", userSchema);

module.exports = { User };