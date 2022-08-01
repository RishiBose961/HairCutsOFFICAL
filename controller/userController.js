const sendMail = require('../helpers/sendMail')
const createToken = require('../helpers/createToken')
const validateEmail = require('../helpers/vaildateEmail')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const HairCuts = require('../models/hairModel')
const ShopAdmin = require('../models/shopAdmin')


const userController = {
    register: async (req, res) => {
        try {
            const { firstname, lastname, email, phone, password } = req.body

            if (!firstname || !lastname || !phone || !email || !password) {
                return res.status(400).json({ message: "Please Fill in all fields" })
            }
            if (!validateEmail(email)) {
                return res.status(400).json({ message: "Please enter a valid email" })
            }
            const user = await User.findOne({ email })
            if (user) {
                return res.status(400).json({ message: "There is already a user with our System" })
            }
            if (password.length < 6) {
                return res.status(400).json({ message: "Password must be at least 6 characters" })
            }

            const salt = await bcrypt.genSalt();
            const hashPassword = await bcrypt.hash(password, salt);

            const newUser = { firstname, lastname, email, phone, password: hashPassword }
            const activation_token = createToken.activation(newUser);

            const url = `https://haircutsapp.herokuapp.com/api/auth/activate/${activation_token}`
            sendMail.sendEmailRegister(email, url, "Verify your Email")

            res.status(200).json({ message: "Welcome ! Please Check your Email" })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },

    activate: async (req, res) => {
        try {
            //get token
            const { activation_token } = req.body
            //verify token
            const user = jwt.verify(activation_token, process.env.ACTIVATION_TOKEN)
            const { firstname, lastname, email, phone, password } = user
            //check user
            const check = await User.findOne({ email })
            if (check) {
                return res.status(400).json({ message: "This Email already Register" })
            }
            //add user
            const newUser = new User({
                firstname, lastname, email, phone, password
            })
            await newUser.save();
            //activation sucess
            res.status(200).json({ message: "Your Acoount has Been Activated, You can now Signin." })

        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },
    signing: async (req, res) => {
        try {
            //get cred
            const { email, phone, password } = req.body;
            //check email
            const user = await User.findOne({
                $or: [
                    {email },
                    {phone }
                ]
            })



            if (!user)
                return res.status(400).json({ message: "This Email is not Register in our Server" })

            //check password
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch)
                return res.status(400).json({ message: "This password is incrrect." })

            //refresh token
            const rf_token = createToken.refresh({ id: user._id })
            res.cookie("_apprftoken", rf_token, {
                httpOnly: true,
                path: "/api/auth/access",
                maxAage: 24 * 60 * 60 * 1000
            });
            //siging success
            res.status(200).json({ message: "Sigin Success" })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },
    access: async (req, res) => {
        try {
            // rf token
            const rf_token = req.cookies._apprftoken;
            if (!rf_token) return res.status(400).json({ msg: "Please sign in." });

            // validate
            jwt.verify(rf_token, process.env.REFRESH_TOKEN, (err, user) => {
                if (err) return res.status(400).json({ msg: "Please sign in again." });
                // create access token
                const ac_token = createToken.access({ id: user.id });
                // access success
                return res.status(200).json({ ac_token });
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    forgot: async (req, res) => {
        try {
            //get email
            const { email } = req.body
            // check email
            const user = await User.findOne({ email })
            if (!user) return res.status(400).json({ message: "This Email is not Register in Our Server" })

            // create access token
            const ac_token = createToken.access({ id: user.id })
            //send email
            const url = `http://localhost:3000/auth/reset-password/${ac_token}`
            const name = user.name
            sendMail.sendEmailReset(email, url, "Reset your password", name)
            //success
            res.status(200).json({ message: "Re-Send The Password,Please Check your Email" })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },
    reset: async (req, res) => {
        try {
            //get password
            const { password } = req.body
            //hash password
            const salt = await bcrypt.genSalt()
            const hashPassword = await bcrypt.hash(password, salt)
            //update password
            await User.findOneAndUpdate(
                { _id: req.user.id },
                { password: hashPassword }
            )
            //reset sucess
            res.status(200).json({ message: "Password was Update Successfully" })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },
    info: async (req, res) => {
        try {
            //get info  -password
            const user = await User.findById(req.user.id).select("-password");
            //return user
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },
    update: async (req, res) => {
        try {
            //get info
            const { name, avatar } = req.body
            //update
            await User.findOneAndUpdate(
                { _id: req.user.id },
                { name, avatar }
            )
            //success
            res.status(200).json({ message: "Update Successfully" })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },
    createhair: async (req, res) => {
        try {
            const { nohaircut, rating, date, shopname } = req.body
            if (!nohaircut || !rating || !date || !shopname) {
                return res.status(402).json({ error: "Plz add all the fields" })
            }

            const post = new HairCuts({
                shopname,
                nohaircut,
                rating,
                date,
                postedBy: req.user.id
            })
            post.save().then(result => {
                res.json({ post: result })
            }).catch(error => console.log(error))
        } catch (error) {
            res.status(500).json({ message: error.message })
        }


    },

    myhairorder: async (req, res) => {
        HairCuts.find({ postedBy: req.user.id })
            .populate("postedBy", "_id firstname")
            .then(mypost => {
                res.json({ mypost })
            })
            .catch(err => {
                console.log(err);
            })
    },


    signout: async (req, res) => {
        try {
            //clear cookie
            res.clearCookie("_apprftoken", { path: "/api/auth/access" })
            //success
            res.status(200).json({ message: "Signout Successfully" })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },

}
module.exports = userController;