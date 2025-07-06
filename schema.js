const Joi = require("joi");

module.exports.patientSchema = Joi.object({
    PatientInfo: Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
        image: Joi.string().allow("", null).required(),
        email: Joi.string().required(),
    }).required
});

// const mongoose = require("mongoose");

// const patientSchema = new mongoose.Schema({
    
//     username: {
//         type: String,
//         required: true,
//     },
//     password: {
//         type: String,
//         required: true,
//     },
//     email: String,
//     image: {
//         url: String,
//         filename: String,
//     },
//     createdAt: {
//             type: Date,
//             default: Date.now(),
//         }
// });

// module.exports = patientSchema;