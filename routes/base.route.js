'use strict';
const Joi = require('joi');
const Boom = require('boom');
const handlers = require('../controllers/mail.controler');

module.exports = [
    {
        method: '*',
        path: '/{p*}',
        handler: (request, h) => {
            return Boom.badRequest('route does not exist');
        },
        options: {
            auth: false,
            validate: {
                options: {
                    abortEarly: false,
                    allowUnknown: true
                }
            }
        }
    },
    {
        method: '*',
        path: '/api/request',
        handler: handlers.mail,
        options: {
            auth: false,
            validate: {
                options: {
                    abortEarly: false,
                    allowUnknown: true
                }
            }
        }
    },
    {
        method: '*',
        path: '/api/addNewPerson',
        handler: (req, res) => {
            console.log(req, res)
        },
        options: {
            auth: false,
            validate: {
                options: {
                    abortEarly: false,
                    allowUnknown: true
                }
            }
        }
    }
];