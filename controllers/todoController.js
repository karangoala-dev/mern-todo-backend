const { mongo, default: mongoose } = require('mongoose');
const asyncHandler = require('express-async-handler');
const Todo = require('../models/todoModel');

//@desc Get all todos for signed in user
//@route GET /api/todos
//@access Private

const getTodo = asyncHandler(async (req, res) => {
    if(!req.user){
        console.log("No user");
    }
    else if(!req.user.id){
        console.log("No id");
    }
    const todos = await Todo.find({user_id: req.user.id});
    res.status(200).json(todos);
});

//@desc Add a todo
//@route POST /api/todos
//@access Private

const addTodo = asyncHandler(async (req, res) => {
    console.log(req.body);
    const { title, content } = req.body;
    if (!title) {
        res.status(400);
        throw new Error('Entering the title is mandatory');
    }

    const todo = await Todo.create({
        title,
        content,
        user_id: req.user.id
    });
    // console.log(res);
    res.status(201).json(todo);
});

//@desc Update a todo for signed in user
//@route POST /api/todos/:id
//@access Private

const updateTodo = asyncHandler(async (req, res) => {
    const todo = await (Todo.findById(req.params.id));
    console.log(todo);
    if (!todo) {
        res.status(404);
        throw new Error('Todo not found');
    }
    if (todo.user_id.toString() != req.user.id) {
        res.status(403);
        throw new Error('User not authorized to update this todo');
    }

    const updatedTodo = await (Todo.findByIdAndUpdate(req.params.id, req.body, { new: true }));
    res.status(200).json(updatedTodo);
});

// const updateContact = asyncHandler(async (req, res) => {
//     const contact = await (Contact.findById(req.params.id));
//     if(!contact){
//         res.status(404);
//         throw new Error("Contact not found");
//     }

//     if(contact.user_id.toString()!== req.user.id){
//         res.status(403);
//         throw new Error("User does not have permission to update this contact.")
//     }

//     const updatedContact = await Contact.findByIdAndUpdate(
//         req.params.id,
//         req.body,
//         { new: true }
//     );
//     res.status(200).json(updatedContact);
// });

//@desc Delete a todo
//@route DELETE /api/todos/:id
//@access Private

const deleteTodo = asyncHandler(async (req, res) => {
    const todo = await (Todo.findById(req.params.id));
    console.log(todo);
    if (!todo) {
        res.json(404);
        throw new Error("Todo not found");
    }
    if(todo.user_id.toString()!== req.user.id){
        res.status(403);
        throw new Error("User does not have permission to delete this todo.")
    }

    await Todo.findByIdAndRemove(req.params.id);
    res.status(200).json(todo);
});

module.exports = { getTodo, addTodo, updateTodo, deleteTodo };