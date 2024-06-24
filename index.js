const express = require('express');
const app = express();
const port = 8000;
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const db = require('./config/mongoose');
// // used for session cookie
const session = require('express-session');
const passport = require('passport');
const morgan= require('morgan');
// const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
// const Passportgoogle = require('./config/passport-google-oauth-strategy');


// const MongoStore = require('connect-mongo')(session);
app.use(morgan("dev"));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());



// makes the uplaod path avaialble
// app.use('/uploads', express.static(__dirname + '/uploads'));


// extract style and scripts from sub pages into the layout


// mongostore used to store the cookie in the db


// app.use(passport.initialize());
// app.use(passport.session());

// app.use(passport.setAuthenticatedUser);

// use express router
app.use('/', require('./routes'));


app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});

