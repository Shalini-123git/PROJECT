const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reportSchema = new mongoose.Schema({
    
    url: String,
    filename: String,
    uploadedAt: { 
        type: Date, 
        default: Date.now() 
    }
});

const Report = mongoose.model("Report", reportSchema);
module.exports = Report;
