const { User } = require("../models/user.model");
const bcrypt = require("bcrypt");

module.exports = {
    signUpUser: async (req, res) => {

        const isUserFound = await User.findOne({ email: req.body.email })

        if (isUserFound) {
            return res.status(402).json({ created: false, message: "Email already exists" })
        } 


        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const user = new User({
            ...req.body,
            password:hashedPassword
        });
        await user.save();
        res.status(201).json(user)
    },

    signInUser: async (req, res) => {
        try {
            const user = await User.findOne({ email: req.body.email })
            if (!user) {
                return res.status(402).json({ created: false, message: "Email doesn't exist" })
            } 
            const validPassword = await bcrypt.compare(req.body.password, user.password)
            if (validPassword) {
                return res.status(201).json(user)
            }
            else
                return res.status(401).json({ created: false, message: "Password wrong" })
        } catch (err) {
            return res.json(null)
        }
    }

}