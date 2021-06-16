const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');
const userService = require('service/userService');
const { secret } = require('config.json');
const db = require('mongodb/db');

// routes
router.post('/authenticate', authenticateSchema, authenticate);


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
        .then(({ refreshToken, ...user }) => {
            setTokenCookie(res, refreshToken);
            res.json(user);
        })
        .catch(next);
}

function setTokenCookie(res, token)
{
    const cookieOptions = {
        httpOnly: true,
        expires: new Date(Date.now() + 7*24*60*60*1000)
    };
    res.cookie('refreshToken', token, cookieOptions);
}