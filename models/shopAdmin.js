const { Schema, model,mongoose } = require('mongoose')

const shopSchema = new Schema({
    shopname: {
        type: String,
        required: true,
    },
    owner: {
        type: String,
        required: true,
    },
    pin: {
        type: Number,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    phone: {
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
    address: {
        type: String,
        required: true
    }
}, { timestamps: true }
);

const ShopAdmin = model("ShopAdmin", shopSchema);

module.exports = ShopAdmin;