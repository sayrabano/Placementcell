// required library
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();
const port = process.env.PORT || 8000;

const session = require('express-session');
const db = require('./config/mongoose');
const MongoStore = require('connect-mongo')(session);
const passportgoogle = require('./config/passport-googleoauth2-strategy')
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

// used for sessions

const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");



app.use(cookieParser());

// set up view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'placementcell',
    secret:'placementcell',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        
        },
        function(err){
            console.log(err ||  'connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('./assets'));
// sets the authenticated user in the response
app.use(passport.setAuthenticatedUser);

// using express routers
app.use(require("./routes"));

// using bodyParser
app.use(bodyParser.json());

// listening to the port 8000;
app.listen(port, (err) => {
  if (err) {
    console.log("error in starting the server", err);
    return;
  }
  console.log("server is succesfully running on port 8000");
});