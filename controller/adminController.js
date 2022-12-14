const sendMail = require('../helpers/sendMail')
const createToken = require('../helpers/createToken')
const validateEmail = require('../helpers/vaildateEmail')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Adminhairshop = require('../models/adminhairshop')
const HairCuts = require('../models/hairModel')
const User = require('../models/userModel')
const ShopAdmin = require('../models/shopAdmin')


const adminController = {
    registers: async (req, res) => {
        try {
            const { name, phone, email, password } = req.body

            if (!name || !phone || !email || !password) {
                return res.status(400).json({ message: "Please Fill in all fields" })
            }
            if (!validateEmail(email)) {
                return res.status(400).json({ message: "Please enter a valid email" })
            }
            const user = await Adminhairshop.findOne({ email })
            if (user) {
                return res.status(400).json({ message: "There is already a user with our System" })
            }
            if (password.length < 6) {
                return res.status(400).json({ message: "Password must be at least 6 characters" })
            }

            const salt = await bcrypt.genSalt();
            const hashPassword = await bcrypt.hash(password, salt);

            const newUser = { name, phone, email, password: hashPassword }
            const activation_token = createToken.activation(newUser);

            const url = `http://localhost:3000/api/auth/activate/${activation_token}`
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
            const { name, phone, email, password } = user
            //check user
            const check = await Adminhairshop.findOne({ email })
            if (check) {
                return res.status(400).json({ message: "This Email already Register" })
            }
            //add user
            const newUser = new Adminhairshop({
                name, phone, email, password
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
            const { email, password } = req.body;
            //check email
            const user = await Adminhairshop.findOne({ email })
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
                const ac_tokens = createToken.access({ id: user.id });
                // access success
                return res.status(200).json({ ac_tokens });
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
            const user = await Adminhairshop.findOne({ email })
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
            await Adminhairshop.findOneAndUpdate(
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
            const user = await Adminhairshop.findById(req.user.id).select("-password");
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
            await Adminhairshop.findOneAndUpdate(
                { _id: req.user.id },
                { name, avatar }
            )
            //success
            res.status(200).json({ message: "Update Successfully" })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },

    showallorder: async (req, res) => {
        HairCuts.find()
            .populate("postedBy", "_id firstname lastname")
            .then(showposts => {
                res.json({ showposts })
            })
            .catch(err => {
                console.log(err);
            })
    },

    getuser: async (req, res) => {
        User.find()
            .then(allposts => {
                res.json({ allposts })
            })
            .catch(err => {
                console.log(err);
            })
    },

    createShop: async (req, res) => {
        try {
            const { shopname, owner, pin, state, gender, phone, email, password, address } = req.body
            if (!shopname || !owner || !pin || !state || !gender || !phone || !email || !password || !address) {
                return res.status(402).json({ error: "Plz add all the fields" })
            }

            const shop = new ShopAdmin({
                shopname, owner, pin, state, gender, phone, email, password, address
            })
            shop.save().then(result => {
                res.json({ shop: result })
            }).catch(error => console.log(error))
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },

    getallshop: async (req, res) => {
        ShopAdmin.find()
            .then(allshop => {
                res.json({ allshop })
            })
            .catch(err => {
                console.log(err);
            })
    },

    getallshopid: async (req, res) => {
        try{
            // console.log(req.params);
            const {id} =req.params;
    
            const userindividual = await ShopAdmin.findById({_id:id});
            // console.log(userindividual);
            res.status(201).json(userindividual)
        }catch(error){
            res.status(422).json(error)
        }
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
module.exports = adminController;