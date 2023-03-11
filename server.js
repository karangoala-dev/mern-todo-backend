const express = require('express');
const connectDB = require('./config/dbConnect');
connectDB();
const app = express();
const port = process.env.PORT || 2000;
const errorHandler = require('./middleware/errorHandler');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');

app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
app.use(express.json());    //parsing request to JSON format 
app.use('/api/todos', require('./routes/todoRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use(errorHandler);

app.listen(port, ()=>{
    console.log(`Listening on port : ${port}`)
});