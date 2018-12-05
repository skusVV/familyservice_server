'use strict';
const Boom = require('boom');
const vacancy = require('../models/vacancy.model');
const mongoose = require('mongoose');

const Vacancy =  mongoose.model('Vac', vacancy);

module.exports = {
    auth: async (request, h) => {
        try {
            const {login, password} = request.payload;

            if (login === process.env.LOGIN && password === process.env.PASSWORD) {
                return h.response({
                    'success': 200,
                    'status': 'Ok',
                    'payload': {login, password}
                }).code(201);
            }
            return Boom.badRequest('Wrong login or password');
        } catch (err) {
            throw Boom.badRequest(err);
        }
    },
    addVacancy: async (request, h) => {
        const {login, password} = request.payload.auth;

        if (login !== process.env.LOGIN || password !==  process.env.PASSWORD) {
            throw Boom.badRequest('auth');
        }

        try {
            const vacancy = await new Vacancy(request.payload.data);
            vacancy.save();

            return h.response({
                'success': 200,
                'status': 'Ok',
            }).code(201);
        } catch (err) {
            throw Boom.badRequest(err);
        }
    },

    vacancies: async (request, h) => {
        try {
            const vacancies = await Vacancy.find({},(err, users) => users);
            return h.response({
                'success': 200,
                'data': vacancies,
                'status': 'Ok',
            }).code(201);


        } catch (err) {
            throw Boom.badRequest(err);
        }
    },

    deleteVacancy: async (request, h) => {
        const {login, password} = request.payload.auth;

        if (login !== process.env.LOGIN || password !== process.env.PASSWORD) {
            throw Boom.badRequest('auth');
        }

        try {
            await Vacancy.find({ _id: request.payload.id }).remove().exec();

            return h.response({
                'success': 200,
                'status': 'Ok',
            }).code(201);


        } catch (err) {
            throw Boom.badRequest(err);
        }
    }
}