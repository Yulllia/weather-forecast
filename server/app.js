const express = require("express");
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const passport = require("passport");
const session = require("express-session");
const connectDB = require("./config/db");
const morgan = require("morgan");
const path = require('path')
const cors = require('cors'); 
const MongoStore = require('connect-mongo');

dotenv.config({ path: "./config/.env" });

require('./config/passport')(passport)

connectDB();

const app = express();

app.use(express.json());

app.use(cors());

//Sessions
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    // store: MongoStore.create({mongoUrl: process.env.MONGO_URI,}),
  }))


//Passport middleware
app.use(passport.initialize())
app.use(passport.session())

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Static folder
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
