const db = require('../database/models');
const { Op, Association } = require("sequelize");
const Sequelize = require('sequelize');

let infoController = {
    getContact: function (req, res, next) {
      return res.render('contact', { title: 'iChef - Contacto',
                                     usuario: req.session.usuarioLogueado });
    },
    getNosotros: function (req, res, next) {
      return res.render('nosotros', { title: 'iChef - Nosotros',
                                 usuario: req.session.usuarioLogueado });
    },
    getStaff: function (req, res, next) {
      return res.render('staff', { title: 'iChef - Staff',
                              usuario: req.session.usuarioLogueado });
    },
    getGuest: function (req, res, next) {
      return res.render('guest', { title: 'iChef - Invitado',
                              usuario: req.session.usuarioLogueado });
    },
    getZonas: function (req, res, next) {
      return res.render('zonas', { title: 'iChef - Zonas de entrega',
                            usuario: req.session.usuarioLogueado });
    },
    prueba: async function (req, res, next) {
      try {
        let producto = await db.Product.findAll(
          { include:[{association: 'ingredientes'}
                      //{association: 'ingredientes'},
                      //{association: 'rubro'},
                      //{association: 'productType'},
                      //{association: 'marca'}
                    ],
            raw: true,
            nest: true })

        console.log(producto[0].ingredientes.ingredients_products);

        return res.render('prueba', { title: 'iChef - Prueba',
                                      producto,
                                      usuario: req.session.usuarioLogueado });
      } catch (error) {
            console.log(error)
      }
    }
};

module.exports = infoController;