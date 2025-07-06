const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const fileUpload = require("express-fileupload");

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "Digital_Report",
        allowerdformets: ["pdf", "jpg"],
        limit: "1mb"
    },
});

module.exports = {
    cloudinary,                            //from cloudinary.Config 
    storage,
}

