//dependencies
import express, { urlencoded, static } from "express";
import { connect, connection } from "mongoose";
import { initialize, session, use, serializeUser, deserializeUser } from "passport";

import moment from "moment";

// Configure environment variable
require("dotenv").config();
// Express-Session middleware, save session cookie
const expressSession = require("express-session")({
  secret: "secret",
  resave: false,
  saveUninitialized: false,
});

// Import user model
import { createStrategy, serializeUser as _serializeUser, deserializeUser as _deserializeUser } from "./models/User";


import signUpRoute from "./routes/userRoutes";
import loginRoute from "./routes/loginRoute";

// Instantiations
const app = express();

//Database configuration
connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  // useUnifiedTopology:true,
  // useCreateIndex:true,
  // useFindAndModify:false
});

connection
  .on("open", () => {
    console.log("Mongoose connection open");
  })
  .on("error", (err) => {
    console.log(`connection error:${err.message}`);
  });

// Configuration for templating Engine
app.set("view engine", "pug");
app.set("views", "./views");
app.locals.moment = moment;

// Middle ware
app.use(urlencoded({ extended: true }));
// app.use(express.json());

// Initializing  passport module and connecting it to our session
app.use(expressSession);
app.use(initialize());
app.use(session());

// Passport configurations (creating user's strategy)
use(createStrategy());
serializeUser(_serializeUser());
deserializeUser(_deserializeUser());

// middleware for serving static files
app.use(static("public"));
app.use("/public/img", static(__dirname + "/public/img"));

//routes middleware
app.use("/", loginRoute);
app.use("/signup", signUpRoute);

//Request time logger
app.use((req,res,next)=>{
  console.log('New request received at' + Date.now());
  next();
});

//Index page route
app.get('/',(req,res)=>{
  res.render('index')
});

// Sign out route
app.get('/logout',(req,res)=>{
  if(req.session){
      req.session.destroy((err)=>{
          if(err){
              console.log('Sign out error');
          }
          else{
              return res.redirect('/');
          }
      });
  }
});


//Undefined route
app.get('*',(req,res)=>{
  res.status(404).send('Page not found')
});

//Server configuration
port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`listening on port ${port}`));