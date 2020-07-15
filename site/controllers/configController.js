const db = require('../database/models');
const { Op } = require("sequelize");
const Sequelize = require('sequelize');

const getPagination = (page, size) => {//0,5
    const limit = size ? +size : 10;
    const offset = page ? page * limit : 0;
    return { limit, offset };
  };

  const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: datos } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
    return { totalItems, datos, totalPages, currentPage };
  };

let configController = {
    getConfig: async function (req, res, next) {
        const limit = 10;
        const page = 1;
        try {
            const tipoProducto = await db.ProductType.findAndCountAll({ limit}, {order:[['descripcion','ASC']]});
            const rubrosProd = await db.Heading.findAndCountAll({ limit }, {order:[['descripcion','ASC']]})
            const marcasProductos = await db.Brand.findAndCountAll({ limit }, {order:[['descripcion','ASC']]})
            const ingredientesProd = await db.Ingredient.findAndCountAll({ limit }, {order:[['descripcion','ASC']]})
            const cantComensales = await db.Diners.findAndCountAll({ limit }, {order:[['nro_comensales','ASC']]});
            const estadoUsuario = await db.UserStatus.findAndCountAll({ limit }, {order:[['descripcion','ASC']]});

            const resMarcas = getPagingData(marcasProductos, page, limit);
            console.log(resMarcas.totalItems)
            console.log(resMarcas.datos.length)
            console.log(resMarcas.totalPages)
            console.log(resMarcas.currentPage)

            return res.render('configParameter', { title: 'iChef',
                                                    tipoProducto,
                                                    rubrosProd,
                                                    marcasProd: resMarcas,
                                                    ingredientesProd,
                                                    cantComensales,
                                                    estadoUsuario,
                                                    usuario: req.session.usuarioLogueado });
        } catch (error) {
          console.log(error);
        }

    },
    getMarcas: async function (req, res, next) {
        const page = req.params.pagina;
        const { limit, offset } = getPagination(page, 10);
        try {
            const tipoProducto = await db.ProductType.findAndCountAll({ limit, offset}, {order:[['descripcion','ASC']]});
            const rubrosProd = await db.Heading.findAndCountAll({ limit,offset }, {order:[['descripcion','ASC']]})
            const marcasProductos = await db.Brand.findAndCountAll({ limit,offset }, {order:[['descripcion','ASC']]})
            const ingredientesProd = await db.Ingredient.findAndCountAll({ limit,offset }, {order:[['descripcion','ASC']]})
            const cantComensales = await db.Diners.findAndCountAll({ limit,offset }, {order:[['nro_comensales','ASC']]});
            const estadoUsuario = await db.UserStatus.findAndCountAll({ limit,offset }, {order:[['descripcion','ASC']]});

            const resMarcas = getPagingData(marcasProductos, page, limit);
            console.log(resMarcas.totalItems)
            console.log(resMarcas.datos.length)
            console.log(resMarcas.totalPages)
            console.log(resMarcas.currentPage)

            return res.render('configParameter', { title: 'iChef',
                                                    tipoProducto,
                                                    rubrosProd,
                                                    marcasProd: resMarcas,
                                                    ingredientesProd,
                                                    cantComensales,
                                                    estadoUsuario,
                                                    usuario: req.session.usuarioLogueado });
        } catch (error) {
          console.log(error);
        }

    },
    addMarca: async function (req,res,next){
      const brandName = req.body.inMarca;
      //console.log(req.body);
      try {
        const marca = await db.Brand.create({descripcion: brandName});
        if(marca instanceof db.Brand){
          return res.redirect(301, '/config' );
        }
      } catch (error) {
        console.log(error)
      }

    },
    addRubro: async function (req,res,next){
      const headingName = req.body.inRubro;
      //console.log(req.body);
      try {
        const rubro = await db.Heading.create({descripcion: headingName});
        if(rubro instanceof db.Heading){
          return res.redirect(301, '/config' );
        }
      } catch (error) {
        console.log(error)
      }
    },
    addIngrediente: async function (req,res,next){
      const ingrediente = req.body.inIngrediente;
      //console.log(req.body);
      try {
        const ingr = await db.Ingredient.create({descripcion: ingrediente});
        if(ingr instanceof db.Ingredient){
          return res.redirect(301, '/config' );
        }
      } catch (error) {
        console.log(error)
      }
    },
    addTipo: async function (req,res,next){
      const tipo = req.body.inTipoProd;
      //console.log(req.body);
      try {
        const tipoProd = await db.ProductType.create({descripcion: tipo});
        if(tipoProd instanceof db.ProductType){
          return res.redirect(301, '/config' );
        }
      } catch (error) {
        console.log(error)
      }
    },
    addComensal: async function (req,res,next){
      const cantidad = req.body.inCantComensal;
      //console.log(req.body);
      try {
        const cantidadCome = await db.Diners.create({nro_comensales: cantidad});
        if(cantidadCome instanceof db.Diners){
          return res.redirect(301, '/config' );
        }
      } catch (error) {
        console.log(error)
      }
    },
    addEstadoUser: async function (req,res,next){
      const estado = req.body.inEstado;
      //console.log(req.body);
      try {
        const estadoUser = await db.UserStatus.create({descripcion: estado});
        if(estadoUser instanceof db.UserStatus){
          return res.redirect(301, '/config' );
        }
      } catch (error) {
        console.log(error)
      }
    }
};

module.exports = configController;
