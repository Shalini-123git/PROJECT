const Patient = require("../models/user");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "secretkey";

module.exports.index = (req, res) => {
    res.render("login.ejs");
}

module.exports.post = async(req, res) => {
    const { username } = req.body;
    const user = await Patient.findOne( { username });
    
    if(!user){
        res.json("user not found.... please insert valid username, email and password");
    }else{
        const token = jwt.sign(
            {username},
            "secretkey",
            {  expiresIn: "1h" },
        );
    res.send(`User logged in sucessfully ${token} , this is token to access user information.`);
}};

module.exports.generateToken = (req, res) => {
    
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
};

