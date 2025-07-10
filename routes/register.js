const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({storage});
const mongoose = require("mongoose");
const Patient = require("../models/user.js");
const Report = require("../models/report.js");
//signIn route
router.get("/", (req, res) => {
    res.render("register.ejs");
})

//create route
router.post("/post", upload.single("image"), async (req, res) => {
    try {
        if(!req.file){
            return res.status(400).send("No file uploaded");
        }
    const {path: url, filename } = req.file;
    let data = req.body;
    const newReport = new Report({url, filename});
    const newPatient = new Patient(data);
    newPatient.image = {url, filename};

    await newPatient.save();
    await newReport.save();

    
    res.render("show.ejs", {url, filename});
    } catch {
        console.error("Error while saving data", err);
        res.status(500).send("Internal Seerver Error.");
    }
});

module.exports = router;