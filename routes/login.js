const express = require("express");
const router = express.Router();


const loginController = require("../controller/login");
//index route
router.get("/", loginController.index);

//post route
router.post("/", loginController.post);

//generate token
router.get("/profile", verifyToken,  loginController.generateToken);

//function to verify token
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