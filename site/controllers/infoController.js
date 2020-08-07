const db = require('../database/models');
const { Op, Association } = require("sequelize");
const Sequelize = require('sequelize');

let infoController = {
    getContact: function(req, res, next) {
        return res.render('contact', {
            title: 'iChef - Contacto',
            usuario: req.session.usuarioLogueado,
            itemCart: req.session.cart
        });
    },
    getNosotros: function(req, res, next) {
        return res.render('nosotros', {
            title: 'iChef - Nosotros',
            usuario: req.session.usuarioLogueado,
            itemCart: req.session.cart
        });
    },
    getStaff: function(req, res, next) {
        return res.render('staff', {
            title: 'iChef - Staff',
            usuario: req.session.usuarioLogueado,
            itemCart: req.session.cart
        });
    },
    getGuest: function(req, res, next) {
        return res.render('guest', {
            title: 'iChef - Invitado',
            usuario: req.session.usuarioLogueado,
            itemCart: req.session.cart
        });
    },
    getZonas: function(req, res, next) {
        return res.render('zonas', {
            title: 'iChef - Zonas de entrega',
            usuario: req.session.usuarioLogueado,
            itemCart: req.session.cart
        });
    }
};

module.exports = infoController;