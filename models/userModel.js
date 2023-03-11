const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email:{
        type: String,
        required: [true,'Please enter the email id']
    },
    username:{
        type: String,
        required: [true,'Please enter the username']
    },
    password:{
        type: String,
        required: [true,'Please enter the password']
    }
},{
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);