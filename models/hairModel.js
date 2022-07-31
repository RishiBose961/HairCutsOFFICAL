const { Schema, model,mongoose } = require('mongoose')

const hairSchema = new Schema({
    shopname:{
        type: String,
        required: true
    },
    nohaircut: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    date: {
        type:String,
        required: true
    },
    postedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
}, { timestamps: true }
);

const HairCuts = model("HairCuts", hairSchema);

module.exports = HairCuts;