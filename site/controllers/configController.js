const db = require('../database/models');
const { Op } = require("sequelize");
const Sequelize = require('sequelize');


const getPagination = (page, size) => {
    const limit = size ? +size : 5;
    const offset = page ? page * limit : 0;
    return { limit, offset };
  };

  const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: tutorials } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
    return { totalItems, tutorials, totalPages, currentPage };
  };


let configController = {
    getConfig: async function (req, res, next) {
        const size = 5;
        const pagina = 1

        const { limit, offset } = getPagination(pagina, size);

        const tipoProducto = await db.ProductType.findAndCountAll({ limit, offset }, {order:[['descripcion','ASC']]});
        const rubrosProd = await db.Heading.findAndCountAll({ limit, offset }, {order:[['descripcion','ASC']]})
        const marcasProd = await db.Brand.findAndCountAll({ limit, offset }, {order:[['descripcion','ASC']]})
        const ingredientesProd = await db.Ingredient.findAndCountAll({ limit, offset }, {order:[['descripcion','ASC']]})
        const cantComensales = await db.Diners.findAndCountAll({ limit, offset }, {order:[['nro_comensales','ASC']]});
        const estadoUsuario = await db.UserStatus.findAndCountAll({ limit, offset }, {order:[['descripcion','ASC']]});

        return res.render('configParameter', { title: 'iChef',
                                                tipoProducto,
                                                rubrosProd,
                                                marcasProd,
                                                ingredientesProd,
                                                cantComensales,
                                                estadoUsuario,
                                                usuario: req.session.usuarioLogueado });
    },

    getMarcas: async function (req, res, next) {
        const page = req.params.pagina;
        const { limit, offset } = getPagination(page, 5);

        const response = getPagingData(marcasProd, page, limit);

        return res.render('configParameter', { title: 'iChef',
                                                tipoProducto,
                                                rubrosProd,
                                                marcasProd,
                                                ingredientesProd,
                                                cantComensales,
                                                estadoUsuario,
                                                usuario: req.session.usuarioLogueado });

    }


};

module.exports = configController;
