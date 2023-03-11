const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    title: {
        type: String,
        required: [true,'Please enter the todo title']
    },
    content: {
        type: String
    }
},{
    timestamps: true
});

module.exports = mongoose.model('Todo', todoSchema);