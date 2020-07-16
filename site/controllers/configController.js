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
    getConfig: function (req, res, next) {
      return res.render('configuration', { title: 'iChef - Configuración',
                                          usuario: req.session.usuarioLogueado });
    },
    getAllConfig: async function (req, res, next) {
        let poffset = 10;
        let page = 0;
        const { limit, offset } = getPagination(page, poffset);
        try {
            const tipoProducto = await db.ProductType.findAndCountAll({ limit: limit, offset: offset}, {order:[['descripcion','ASC']]});
            const rubrosProd = await db.Heading.findAndCountAll({ limit: limit, offset: offset }, {order:[['descripcion','ASC']]})
            const marcasProductos = await db.Brand.findAndCountAll({ limit: limit, offset: offset }, {order:[['descripcion','ASC']]})
            const ingredientesProd = await db.Ingredient.findAndCountAll({ limit: limit, offset: offset }, {order:[['descripcion','ASC']]})
            const cantComensales = await db.Diners.findAndCountAll({ limit: limit, offset: offset }, {order:[['nro_comensales','ASC']]});
            const estadoUsuario = await db.UserStatus.findAndCountAll({ limit: limit, offset: offset }, {order:[['descripcion','ASC']]});

            const resMarcas = getPagingData(marcasProductos, page, limit);
            console.log("Total registros: " + resMarcas.totalItems)
            console.log("Cant x pagina: " + resMarcas.datos.length)
            console.log("Total paginas: " + resMarcas.totalPages)
            console.log("Pagina actual: " + resMarcas.currentPage)

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
        let poffset = 10;
        const { limit, offset } = getPagination(req.params.page-1, poffset);
        try {
            const marcasProductos = await db.Brand
              .findAndCountAll({ limit: limit,
                                 offset: offset},
                                 {order:[['descripcion','ASC']]})

            const configMarcas = getPagingData(marcasProductos, req.params.page, limit);
            console.log("Total registros: " + configMarcas.totalItems)
            console.log("Cant x pagina: " + configMarcas.datos.length)
            console.log("Total paginas: " + configMarcas.totalPages)
            console.log("Pagina actual: " + configMarcas.currentPage)

            return res.render('configParameter', { title: 'iChef',
                                                    configuracion: configMarcas,
                                                    tipoConfig: 'Marcas',
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
    getRubros: async function (req, res, next) {
      let poffset = 10;
      const { limit, offset } = getPagination(req.params.page-1, poffset);
      try {
          const rubrosProd = await db.Heading.findAndCountAll({ limit: limit, offset: offset }, {order:[['descripcion','ASC']]})

          const configRubros = getPagingData(rubrosProd, req.params.page, limit);
          console.log("Total registros: " + configRubros.totalItems)
          console.log("Cant x pagina: " + configRubros.datos.length)
          console.log("Total paginas: " + configRubros.totalPages)
          console.log("Pagina actual: " + configRubros.currentPage)

          return res.render('configParameter', { title: 'iChef',
                                                  configuracion: configRubros,
                                                  tipoConfig: 'Rubros',
                                                  usuario: req.session.usuarioLogueado });
      } catch (error) {
        console.log(error);
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
    getIngredientes: async function (req, res, next) {
      let poffset = 10;
      const { limit, offset } = getPagination(req.params.page-1, poffset);
      try {
          const ingredientesProd = await db.Ingredient.findAndCountAll({ limit: limit, offset: offset }, {order:[['descripcion','ASC']]})

          const configIngredientes = getPagingData(ingredientesProd, req.params.page, limit);
          console.log("Total registros: " + configIngredientes.totalItems)
          console.log("Cant x pagina: " + configIngredientes.datos.length)
          console.log("Total paginas: " + configIngredientes.totalPages)
          console.log("Pagina actual: " + configIngredientes.currentPage)

          return res.render('configParameter', { title: 'iChef',
                                                  configuracion: configIngredientes,
                                                  tipoConfig: 'Ingredientes',
                                                  usuario: req.session.usuarioLogueado });
      } catch (error) {
        console.log(error);
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
    getTipos: async function (req, res, next) {
      let poffset = 10;
      const { limit, offset } = getPagination(req.params.page-1, poffset);
      try {
          const tipoProducto = await db.ProductType.findAndCountAll({ limit: limit, offset: offset}, {order:[['descripcion','ASC']]});

          const configTipos = getPagingData(tipoProducto, req.params.page, limit);
          console.log("Total registros: " + configTipos.totalItems)
          console.log("Cant x pagina: " + configTipos.datos.length)
          console.log("Total paginas: " + configTipos.totalPages)
          console.log("Pagina actual: " + configTipos.currentPage)

          return res.render('configParameter', { title: 'iChef',
                                                  configuracion: configTipos,
                                                  tipoConfig: 'Tipos',
                                                  usuario: req.session.usuarioLogueado });
      } catch (error) {
        console.log(error);
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
    getComensales: async function (req, res, next) {
      let poffset = 10;
      const { limit, offset } = getPagination(req.params.page-1, poffset);
      try {
          const cantComensales = await db.Diners.findAndCountAll({ limit: limit, offset: offset }, {order:[['nro_comensales','ASC']]});

          const configComensales = getPagingData(cantComensales, req.params.page, limit);
          console.log("Total registros: " + configComensales.totalItems)
          console.log("Cant x pagina: " + configComensales.datos.length)
          console.log("Total paginas: " + configComensales.totalPages)
          console.log("Pagina actual: " + configComensales.currentPage)

          return res.render('configParameter', { title: 'iChef',
                                                  configuracion: configComensales,
                                                  tipoConfig: 'Comensales',
                                                  usuario: req.session.usuarioLogueado });
      } catch (error) {
        console.log(error);
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
    getEstados: async function (req, res, next) {
      let poffset = 10;
      const { limit, offset } = getPagination(req.params.page-1, poffset);
      try {
          const estadoUsuario = await db.UserStatus.findAndCountAll({ limit: limit, offset: offset }, {order:[['descripcion','ASC']]});

          const configEstado = getPagingData(estadoUsuario, req.params.page, limit);
          console.log("Total registros: " + configEstado.totalItems)
          console.log("Cant x pagina: " + configEstado.datos.length)
          console.log("Total paginas: " + configEstado.totalPages)
          console.log("Pagina actual: " + configEstado.currentPage)

          return res.render('configParameter', { title: 'iChef',
                                                  configuracion: configEstado,
                                                  tipoConfig: 'Estados',
                                                  usuario: req.session.usuarioLogueado });
      } catch (error) {
        console.log(error);
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
    },
    getRoles: async function (req, res, next) {
      let poffset = 10;
      const { limit, offset } = getPagination(req.params.page-1, poffset);
      try {
          const rolesUsuario = await db.UserCategorie.findAndCountAll({ limit: limit, offset: offset }, {order:[['descripcion','ASC']]});

          const configRoles = getPagingData(rolesUsuario, req.params.page, limit);
          console.log("Total registros: " + configRoles.totalItems)
          console.log("Cant x pagina: " + configRoles.datos.length)
          console.log("Total paginas: " + configRoles.totalPages)
          console.log("Pagina actual: " + configRoles.currentPage)

          return res.render('configParameter', { title: 'iChef',
                                                  configuracion: configRoles,
                                                  tipoConfig: 'Roles',
                                                  usuario: req.session.usuarioLogueado });
      } catch (error) {
        console.log(error);
      }

    },
};

module.exports = configController;
