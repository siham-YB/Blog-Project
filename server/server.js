const dotenv = require('dotenv').config();
const express = require('express');
// const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');
// maxAge: 24 * 60 * 60 * 100

const app = express();



//DB connection
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('DB connected'))
.catch((err) => console.log('database not connected' , err))


//middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());





app.use('/' , require('./routes/authRoutes'))
app.use('/register', require('./routes/authRoutes'))
app.use('/login' , require('./routes/authRoutes'))
app.use('/logout', require('./routes/authRoutes'))




app.listen(`${process.env.PORT} `, () => {console.log(`server is running on port ${process.env.PORT} `)})
