'use strict';
const Joi = require('joi');
const Boom = require('boom');
const handlers = require('../controllers/mail.controler');
const adminHandlers = require('../controllers/admin.controller');

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
        path: '/api/vacancy',
        handler: adminHandlers.addVacancy,
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
        path: '/api/admin/auth',
        handler: adminHandlers.auth,
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
        method: 'GET',
        path: '/api/vacancies',
        handler: adminHandlers.vacancies,
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
        method: 'POST',
        path: '/api/deleteVacancy',
        handler: adminHandlers.deleteVacancy,
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
];