const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Patient = require("../models/user");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "secretkey";

router.get("/", async (req, res) => {
    // const patientData = await Patient.find({});
    res.render("login.ejs");
})

//post route
router.post("/",async(req, res, next) => {
    
    // let patientData = await Patient.find({});
    // console.log(patientData[0]);
    const { username, password } = req.body;

    const user = await Patient.findOne( { username });
    
    if(!user){
        res.json("user not found.... please insert valid username, email and password");
    }else{
    const token = jwt.sign(
        {username},
        "secretkey",
        {  expiresIn: "1h" },
    );
    res.send("User logged in successfully");
}
    
});

router.get("/profile", verifyToken,  (req, res) => {
    
    jwt.verify(req.token, SECRET_KEY, (err, data) => {
        if(err){
            res.send("invalid token");
        }else{
            res.json({
                message: "profile accessed",
                data
            })
        }
    })
});

function verifyToken(req, res, next){
    
    const bearerHeader = req.headers["authorization"];
    
    if(typeof bearerHeader != "undefined"){
        const bearer = bearerHeader.split(" ");
        const token = bearer[1];
        req.token = token;
        next();
    }else{
        res.send({
            result: "Token is not valid"
        })
    }
}

module.exports = router;