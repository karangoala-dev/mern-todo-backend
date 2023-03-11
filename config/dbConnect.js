const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async()=>{
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log(`Successfully connected to DB : ${connect.connection.host} and name : ${connect.connection.name}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB;