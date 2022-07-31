const { Schema, model } = require('mongoose')

const adminhairshopSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phone:{
        type: Number,
        required: true
    },
    email: {
        type: String, 
        required: true
    },
    password: {
        type: String, 
        required: true
    },
}, { timestamps: true }
);

const Adminhairshop = model("Adminhairshop", adminhairshopSchema);

module.exports = Adminhairshop;