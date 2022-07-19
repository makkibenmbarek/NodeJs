const { User } = require("../models/user.model");
const bcrypt = require("bcrypt");

module.exports = {
    signUpUser: async (req, res) => {

        const isUserFound = await User.findOne({ matricule: req.body.matricule })

        


       // const salt = await bcrypt.genSalt(10);
        //const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const user = new User({
            ...req.body,
           // password: hashedPassword
        });
        await user.save();
        res.status(201).json(user)
    },

    getAllUsers: async (req, res) => {
        const users = await User.find({ _id: { $ne: req.headers.id } });
        res.status(201).json(users);
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
    },

    googleSignInUser: async (req, res) => {
        try {
            const isUserFound = await User.findOne({ email: req.body.email })
            if (isUserFound) {
                return res.status(201).json(isUserFound)
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);

            const user = new User({
                ...req.body,
                password: hashedPassword
            });
            await user.save();
            res.status(201).json(user)
        } catch (err) {
            return res.json(null)
        }
    },

    updateProfile: async (req, res) => {
        console.log(req.body.firstName)
        console.log(req.body.id)
        const user = await User.findOneAndUpdate(
            { _id: req.body.id },
            {
                $set: {
                    nom: req.body.nom,
                    prenom: req.body.prenom,
                    matricule: req.body.matricule,
                    poste: req.body.poste,
                   // address: req.body.address,
                   // phoneNumber: req.body.phoneNumber,
                },
            }
        );
        res.status(200).send(user);
    },

    ResetPassword: async (req, res) => {
        const userFound= await User.findOne({ _id: req.body.id })
        const validPassword = await bcrypt.compare(req.body.oldPassword, userFound.password)
        if (validPassword) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);
            const user = await User.findOneAndUpdate(
                { _id: req.body.id },
                {
                    $set: {
                        password: hashedPassword,
                    },
                }
            );
            res.status(201).send(user);
        }
        else{
            res.status(401).json({ created: false, message: "Password wrong" })
        }

        
       
    }

}