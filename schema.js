const Joi = require("joi");

module.exports.patientSchema = Joi.object({
    PatientInfo: Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
        image: Joi.string().allow("", null).required(),
        email: Joi.string().required(),
    }).required
});
