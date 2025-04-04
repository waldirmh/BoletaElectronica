const express = require("express");
const engine = require("ejs-mate");
const path = require("path");
const morgan = require("morgan");
const sesion = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");

const app = express();

// SETTINGS 

app.set("views", path.join(__dirname, "views")); 
console.log(path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname, "public"))); 

app.engine("ejs", engine); 
app.set("view engine", "ejs"); 
app.set("port", process.env.PORT || 3000);

// MIDDLEWARES

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false })); 
// inicializamos la sesion
app.use(
  sesion({
    secret: "myscretsession",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(flash()); 
// app.use(passport.initialize());
// app.use(passport.session());

app.use((req, res, next) => {
  app.locals.signupMessage = req.flash("signupMessage");
  app.locals.signinMessage = req.flash("signinMessage");
  app.locals.user = req.user;
  next();
});

// ROUTES
app.use("/", require("./routes/index"));

// SERVER 
app.listen(app.get("port"), () => {
  console.log("server on port", app.get("port"));
});
