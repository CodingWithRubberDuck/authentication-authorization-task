const express = require("express");
const morgan = require("morgan");
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/authRoutes')
const protectedRoutes = require('./routes/protectedRoutes')

const errorHandler = require('./middleware/errorHandler')

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use('/api/account', authRoutes);
app.use('/api/protected', protectedRoutes);

app.use(errorHandler)




module.exports = app;
