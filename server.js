const cookieParser = require('cookie-parser')
const userRoutes = require('./routes/userRoutes')
const adminRoutes = require('./routes/adminRoute')
const mongoose = require("mongoose");
const express = require("express");
const app = express();
require("dotenv").config();
const path = require('path');

//db

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.')
    } else {
        console.log('Error in DB connection: ' + err)
    }
});



app.use(express.json());
express.urlencoded({ extended: true });
app.use(cookieParser());


// s
app.use(userRoutes);
app.use(adminRoutes);



if(process.env.NODE_ENV === 'production') {
    app.use(express.static("client/build"));

}


const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log("SERVER is Active");
})
