const db = require('../database/models');
const { Op } = require("sequelize");
const Sequelize = require('sequelize');

  const getPagination = (page) => {
    let limit = 10;
    let offset = 0;
    offset = (page - 1) * limit

    return { limit, offset };
  };
  const getCountData = (data,limit) => {
    const totalPages = Math.ceil(data.count / limit);
    const totalItems = data.count;
    const dataRow = data.rows
    return { totalItems, totalPages, dataRow };
  }


let configController = {
    getConfig: function (req, res, next) {
      return res.render('configuration', { title: 'iChef - Configuración',
                                          usuario: req.session.usuarioLogueado });
    },
    getAllConfig: async function (req, res, next) {

        try {
            const tipoProducto = await db.ProductType.findAndCountAll( {order:[['descripcion','ASC']]});
            const rubrosProd = await db.Heading.findAndCountAll( {order:[['descripcion','ASC']]})
            const marcasProductos = await db.Brand.findAndCountAll( {order:[['descripcion','ASC']]})
            const ingredientesProd = await db.Ingredient.findAndCountAll( {order:[['descripcion','ASC']]})
            const cantComensales = await db.Diners.findAndCountAll( {order:[['nro_comensales','ASC']]});
            const estadoUsuario = await db.UserStatus.findAndCountAll( {order:[['descripcion','ASC']]});

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
      let page = Number(req.query.page);
      if(isNaN(page)){ page = 1 }
      const { limit, offset } = getPagination(page);
      try {
            const marcasProductos = await db.Brand
              .findAndCountAll({ limit: limit,
                                 offset: offset},
                                 {order:[['descripcion','ASC']]})
            const { totalItems, totalPages, dataRow } = getCountData(marcasProductos,limit);
            const configMarcas = {
                            totalItems: totalItems,
                            datos: dataRow,
                            totalPages: totalPages,
                            currentPage: page };
            ///const configMarcas = getPagingData(marcasProductos, req.params.page, limit);
            //console.log("Total registros: " , configMarcas.totalItems)
            //console.log("Cant x pagina: " , configMarcas.datos.length)
            //console.log("Total paginas: " , configMarcas.totalPages)
            //console.log("Pagina actual: " , configMarcas.currentPage)

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
      let page = Number(req.query.page);
      if(isNaN(page)){ page = 1 }
      const { limit, offset } = getPagination(page);
      try {
          const rubrosProd = await db.Heading
                                  .findAndCountAll({ limit: limit, offset: offset },
                                    {order:[['descripcion','ASC']]})

          const { totalItems, totalPages, dataRow } = getCountData(rubrosProd,limit);
          const configRubros = {
                            totalItems: totalItems,
                            datos: dataRow,
                            totalPages: totalPages,
                            currentPage: page };

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
      let page = Number(req.query.page);
      if(isNaN(page)){ page = 1 }
      const { limit, offset } = getPagination(page);

      try {
          const ingredientesProd = await db.Ingredient
                        .findAndCountAll({ limit: limit, offset: offset },
                          {order:[['descripcion','ASC']]})
          const { totalItems, totalPages, dataRow } = getCountData(ingredientesProd,limit);
          const configIngredientes = {
                            totalItems: totalItems,
                            datos: dataRow,
                            totalPages: totalPages,
                            currentPage: page };
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
      let page = Number(req.query.page);
      if(isNaN(page)){ page = 1 }
      const { limit, offset } = getPagination(page);
      try {
          const tipoProducto = await db.ProductType
                                  .findAndCountAll({ limit: limit, offset: offset},
                                    {order:[['descripcion','ASC']]});

          const { totalItems, totalPages, dataRow } = getCountData(tipoProducto,limit);
          const configTipos = {
                            totalItems: totalItems,
                            datos: dataRow,
                            totalPages: totalPages,
                            currentPage: page };

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
      let page = Number(req.query.page);
      if(isNaN(page)){ page = 1 }
      const { limit, offset } = getPagination(page);
      try {
          const cantComensales = await db.Diners
                                    .findAndCountAll({ limit: limit, offset: offset },
                                      {order:[['nro_comensales','ASC']]});
          const { totalItems, totalPages, dataRow } = getCountData(cantComensales,limit);
          const configComensales = {
                            totalItems: totalItems,
                            datos: dataRow,
                            totalPages: totalPages,
                            currentPage: page };

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
      let page = Number(req.query.page);
      if(isNaN(page)){ page = 1 }
      const { limit, offset } = getPagination(page);

      try {
          const estadoUsuario = await db.UserStatus
                                        .findAndCountAll({ limit: limit,
                                          offset: offset }, {order:[['descripcion','ASC']]});

          const { totalItems, totalPages, dataRow } = getCountData(estadoUsuario,limit);
          const configEstado = {
                            totalItems: totalItems,
                            datos: dataRow,
                            totalPages: totalPages,
                            currentPage: page };

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
      let page = Number(req.query.page);
      if(isNaN(page)){ page = 1 }
      const { limit, offset } = getPagination(page);
      try {
          const rolesUsuario = await db.UserCategorie
                                      .findAndCountAll({ limit: limit, offset: offset }, 
                                        {order:[['descripcion','ASC']]});
          const { totalItems, totalPages, dataRow } = getCountData(rolesUsuario,limit);
          const configRoles = {
                            totalItems: totalItems,
                            datos: dataRow,
                            totalPages: totalPages,
                            currentPage: page };

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


/*const getPagination = (page, size) => {
    const limit = size ? +size: 10;
    const offset = page ? page * limit: 0;
    //console.log("LIMITE: " + limit + " - OFFSET: " + offset);
    return { limit, offset };
  };

  const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: datos } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
    return { totalItems, datos, totalPages, currentPage };
  };*/