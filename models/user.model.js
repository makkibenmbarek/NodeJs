const mongoose = require("mongoose")


const userSchema = mongoose.Schema({
    nom: String,
    prenom: String,
    matricule: String,
    poste: String,
    
    
}, {
    timestamps: true
});

const User = mongoose.model("user", userSchema);

module.exports = { User };