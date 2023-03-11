const { mongo, default: mongoose } = require('mongoose');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//@desc Register user
//@route POST /api/user/
//@access Public

const registerUser = asyncHandler(async (req, res) => {
    const { email, username, password } = req.body;
    if(!email || !username || !password){
        res.status(400);
        throw new Error('All fields are mandatory');
    }
    const UserAlreadyPresent = await User.findOne({ "username": username });
    if(UserAlreadyPresent){
        res.status(400).json({"message": "User already present please use different username"});
        throw new Error('');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = await User.create({ email, username, password: hashedPassword });
    if(!createdUser){
        res.status(403);
        throw new Error("An error occured while registering user, please try with different email and username");
    }
    res.status(200).json({message: `User created, username: ${username} and email: ${email}`});
});

//@desc Register user
//@route POST /api/user/
//@access Public

const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    if(!username || !password){
        res.status(400);
        throw new Error('Please enter username and password');
    }
    const userFound = await User.findOne({ username });
    if(!userFound){
        res.status(404);
        throw new Error('Username not found');
    }
    if(await bcrypt.compare(password, userFound.password)){
        const accessToken = jwt.sign({
            email: userFound.email,
            username: userFound.username,
            id: userFound.id 
        }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "60m"})
        res.status(200).json({accessToken});
    }else{
        res.status(400).json({message: "invalid username or password"});
    }
});

//@desc Current user info
//@route GET /api/users/current
//@access Private

const currentUser = asyncHandler(async(req, res)=>{
    console.log(req.user);
    res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };