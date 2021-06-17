const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');
const userService = require('service/userService');
// routes
router.post('/Login', authenticateSchema, authenticate);

module.exports = router;


function validateRequest(req, next, schema) {
    const options = {
        abortEarly: false, 
        allowUnknown: true, 
        stripUnknown: true 
    };
    const { error, value } = schema.validate(req.body, options);
    if (error) {
        next(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
    } else {
        req.body = value;
        next();
    }
}

function authenticateSchema(req, res, next) {
    const schema = Joi.object({
        login: Joi.string().required(),
        password: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function authenticate(req, res, next) {
    const { login, password } = req.body;
    const ipAddress = req.ip;
    userService.authenticate({ login, password, ipAddress })
        .then(({...user }) => {
            res.json(user);
        })
        .catch(next);
}
