if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const userLogin = require("./routes/login.js");
const userRegister = require("./routes/register.js");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const fileUpload = require("express-fileupload");

const dbUrl = process.env.ATLASDB_URL;

//server connector
main()
    .then( () => {
        console.log("connect to db");
    })
    .catch( (err) => {
        console.log(err);
    });

async function main(){
    await mongoose.connect(dbUrl);
}
 
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, "/public")));
app.use(methodOverride("_method"));

const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600,
});
store.on("err", () => {
    console.log("ERROR in MONGO SESSION STORE", err)
});

const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,

};

app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());

app.use("/login", userLogin);
app.use("/signIn", userRegister, fileUpload({
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  abortOnLimit: true,
}));

//index route
app.get("/", (req, res) => {
    res.render("index.ejs");
})

app.use((err, req, res, next) => {
    console.log(err.name);
    next(err);
})

app.listen(3000, () => {
    console.log("server is listening to port 3000");
})