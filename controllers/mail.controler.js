'use strict';
const Mongoose = require('mongoose');
const Boom = require('boom');
const User = Models.User
const nodemailer = require('nodemailer');

module.exports = {
    mail: async (request, h) => {
        try {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                tls: true,
                auth: {
                    user: 'familyservice122@gmail.com',
                    pass: process.env.PASS
                }
            });

            const data = request.payload;

            const mailOptions = {
                from: 'familyservice122@gmail.com',
                to: 'info@familyservice.com.ua',
                subject: 'Новая заявка',
                text: `
                    Номер телефона: ${data.phone || 'Не указан'},
                    Имя: ${data.name || 'Не указан'},
                    Персонал: ${data.person || 'Не указан'},
                    Коммент: ${data.comment || 'Не указан'},
                `
            };
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    throw Boom.badRequest(error);
                } else {
                    console.log('Email sent: ' + info);
                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                        }
                    });
                }
            });

            return h.response({
                'success': 200,
                'status': 'Ok'
            }).code(201);
        } catch (err) {
            throw Boom.badRequest(err);
        }
    }
}