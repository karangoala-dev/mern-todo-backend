const express = require('express');
const router = express.Router();
const { getTodo, addTodo, updateTodo, deleteTodo } = require('../controllers/todoController');
const validateToken = require('../middleware/validateTokenHandler');

router.use(validateToken);
router.route('/').get(getTodo);
router.route('/').post(addTodo);
router.route('/:id').put(updateTodo);
router.route('/:id').delete(deleteTodo);

module.exports = router;

