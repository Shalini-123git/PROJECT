const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({storage});

const registerController = require("../controller/register.js");

//signIn route
router.get("/", registerController.singnInRoute);

//create route
router.post("/post", upload.single("image"), registerController.create);

module.exports = router;