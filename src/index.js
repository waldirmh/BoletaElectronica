const express = require("express");
const engine = require("ejs-mate");
const path = require("path");
const morgan = require("morgan");
const passport = require("passport");
const sesion = require("express-session");
const flash = require("connect-flash");

const app = express();

//settings

app.set("views", path.join(__dirname, "views")); // me llama la ruta views
console.log(path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname, "public"))); //  public folder

app.engine("ejs", engine); // es el motor de plantillas
app.set("view engine", "ejs"); // sirve para validar los views del fronted
app.set("port", process.env.PORT || 3000);

// middlewares : se ejecuta antes de ser ejecutados las rutas
// app.use(express.static('public'));

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false })); // me permite capturar datos del cliente
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
