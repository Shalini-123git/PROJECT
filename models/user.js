const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
    
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: String,
    image: {
        url: String,
        filename: String,
    },
    createdAt: {
            type: Date,
            default: Date.now(),
        }
});

const Patient = mongoose.model("patientreport", patientSchema)
module.exports = Patient;