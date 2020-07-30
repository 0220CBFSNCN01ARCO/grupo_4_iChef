const db = require('../database/models');
const { Op } = require("sequelize");
const Sequelize = require('sequelize');
const {check, validationResult, body} = require('express-validator');

let productController = {
    productDetail: function (req, res, next) {
        res.render('productDetail', { title: 'iChef - Detalle productos',
                                      subtitle: 'Detalle producto',
                                      usuario: req.session.usuarioLogueado });
    },
    product_boxDetail: function (req, res, next) {
        res.render('product-boxDetail', { title: 'iChef - Detalle caja',
                                          subtitle: 'Detalle caja',
                                          usuario: req.session.usuarioLogueado });
    },
    listarProductos: function (req, res, next) {
      //console.log("Tipo de producto: " + req.params.tipo);
      db.Product.findAll({
        include:[{association:"productType"},
                  {association:"marca"},
                  {association:"rubro"},
                  {association:"fotos"}],
        where: { product_type_id: req.params.tipo}
      })
      .then((productos)=>{
        //console.log(productos);
        res.render('products', { title: 'iChef - Listado',
                                usuario: req.session.usuarioLogueado,
                                productos: productos});
      })
      .catch(function(error){
        return res.render('errordb', { title: 'Error',
                                       error: error,
                                       usuario: req.session.usuarioLogueado });
      });
    },
    listProduct: function (req, res, next) {
      db.Product.findAll({
        include:[{association: "productType"},
                 {association: "marca"},
                 {association: "productStatus"}]
      })
      .then((productos)=>{
        //console.log(productos);
        res.render('productList', { title: 'iChef - Productos',
                                usuario: req.session.usuarioLogueado,
                                productos:productos});
      })
      .catch(function(error){
        return res.render('errordb', { title: 'Error',
                                       error: error,
                                       usuario: req.session.usuarioLogueado });
      });
    },
    getProductById: function (req, res, next) {
      db.Product.findByPk(req.params.id,
        { include:[{association:"productType"},
                  {association:"marca"},
                  {association:"rubro"},
                  {association:"fotos"},
                  {association:"ingredientes"}
                  ]})
      .then((producto)=>{
        res.render('productDetail', { title: 'iChef - Producto ' + producto.codigo,
                                      subtitle: 'Detalle producto',
                                      usuario: req.session.usuarioLogueado,
                                      producto: producto });
      })
      .catch(function(error){
        return res.render('errordb', { title: 'Error',
                                       error: error,
                                       usuario: req.session.usuarioLogueado });
      });
    },
    productAdd: async function (req, res, next) {
      try{
        const tipoProducto = await db.ProductType.findAll();
        const rubros = await db.Heading.findAll({order:[['descripcion','ASC']]});
        const marcas = await db.Brand.findAll({order:[['descripcion','ASC']]});
        const ingredientes = await db.Ingredient.findAll({order:[['descripcion','ASC']]});
        const cantComensales = await db.Diners.findAll();
        const maxCodigo = await db.Product.findAll({
          attributes: [[Sequelize.fn('max', Sequelize.col('id_product')), 'codigo']],
          raw: true
        });
        //console.log(maxCodigo);
        let codigo = maxCodigo[0].codigo + 1
        res.render('productAdd', {  title: 'iChef - Crear producto',
                                    codigo,
                                    tipoProducto,
                                    rubros,
                                    marcas,
                                    ingredientes,
                                    cantComensales,
                                    usuario: req.session.usuarioLogueado });
      }catch(errorP){
        return res.render('error', { title: 'Error',
                                       error: errorP,
                                       usuario: req.session.usuarioLogueado });
      };
    },
    createProduct: async function (req, res, next) {
      let errores = validationResult(req);
      console.log(req.body);

      if(errores.isEmpty()){
        let precioOferta = 0;
        let descuento = 0;

        //console.log("Oferta:",req.body.precioOferta);
        //console.log("Descuento:",req.body.descuento);
        if(req.body.precioOferta > 0 && req.body.precioOferta != '' ){
          console.log("Precio, soy un numero")
          precioOferta = req.body.precioOferta;
        }
        if(req.body.descuento > 0 && req.body.descuento != '' ){
          console.log("Descuento, soy un numero")
          descuento = req.body.descuento;
        }
        if(typeof req.files.pdfFile != 'undefined'){
          recetaPDF = req.files.pdfFile[0].originalname
        }else {
          recetaPDF = ""
        }
        try{
            const productNew = await db.Product.create({
                codigo: req.body.codigoProducto,
                descripcion: req.body.nombreProducto.substring(0,150),
                product_type_id: req.body.tipo,
                precio: req.body.precioProducto,
                precio_oferta: precioOferta,
                descuento_oferta: descuento,
                rubro_id: req.body.grupo,
                marca_id :req.body.marca,
                detalle: req.body.txtDescripcion.substring(0,150),
                cant_comensales: req.body.radioPersonas,
                calorias: req.body.calorias,
                peso: req.body.peso,
                receta: recetaPDF
            }); //fin create

            //console.log("ID producto: " + productNew.id_product);
            //console.log("Ingredientes:",req.body.ingredientes);
            if(req.body.ingredientes){
              for (i = 0; i < req.body.ingredientes.length ; i++){
                const ingredientes = await db.IngredientProduct
                  .create({ product_id: productNew.id_product ,
                            ingredient_id: req.body.ingredientes[i] });
              }
            }

            for (i = 0; i < req.files.image_uploads.length ; i++){
              const foto = await db.Photo
                .create({ nombre: req.files.image_uploads[i].filename ,
                          product_id: productNew.id_product });
            }

            if (productNew instanceof db.Product){
              return res.redirect(301, '/product' );
            }
        }catch(error){
          console.log(error);
        }
      }else{
        console.log(errores);
        return res.redirect('back');
      }

    },
    editProductById: async function (req, res, next) {
      try {
          const tipoProducto = await db.ProductType.findAll();
          const rubros = await db.Heading.findAll({order:[['descripcion','ASC']]});
          const marcas = await db.Brand.findAll({order:[['descripcion','ASC']]});
          const ingredientes = await db.Ingredient.findAll({order:[['descripcion','ASC']]});
          const cantComensales = await db.Diners.findAll();
          const productEdit = await db.Product.findByPk(req.params.id, {include:[{association:"productType"},
                                                                            {association:"marca"},
                                                                            {association:"rubro"},
                                                                            {association:"fotos"},
                                                                            {association:"ingredientes"} ]})
          //console.log(productEdit);

          if (productEdit instanceof db.Product){
            res.render('productEdit', { title: 'iChef - Editando producto - ' + productEdit.codigo,
                                        producto: productEdit,
                                        tipoProducto,
                                        rubros,
                                        marcas,
                                        ingredientes,
                                        cantComensales,
                                        usuario: req.session.usuarioLogueado});
          }
      } catch (error) {
        console.log(error)
      }
    },
    saveProductById: async function (req, res, next) {
      let errores = validationResult(req);
      //console.log(errores);
      if(errores.isEmpty()){
      //console.log(req);
      //console.log("Oferta:",req.body.precioOferta);
      //console.log("Descuento:",req.body.descuento);
      let precioOferta = 0;
      let descuento = 0;
      if(req.body.precioOferta > 0 && !isNaN(req.body.precioOferta) ){
          precioOferta = req.body.precioOferta;
      }
      if(req.body.descuento > 0 && !isNaN(req.body.descuento) ){
        descuento = req.body.descuento;
      }

      if(typeof req.files.pdfFile != 'undefined'){
        recetaPDF = req.files.pdfFile[0].originalname
      }else {
        recetaPDF = ""
      }
      try {
          const productoUpdate = await db.Product.update({
            codigo: req.body.codigoProducto,
            descripcion: req.body.nombreProducto.substring(0,150),
            product_type_id: req.body.tipo,
            precio: req.body.precioProducto,
            precio_oferta: precioOferta,
            descuento_oferta: descuento,
            rubro_id: req.body.grupo,
            marca_id :req.body.marca,
            detalle: req.body.txtDescripcion.substring(0,150),
            cant_comensales: req.body.radioPersonas,
            calorias: req.body.calorias,
            peso: req.body.peso,
            receta: recetaPDF
        },{
          where: {id_product: req.params.id }
        });

        const delIngredientes = await db.Photo
            .destroy({ where: {product_id: req.params.id }} );

        const delFotos = await db.IngredientProduct
            .destroy({ where: {product_id: req.params.id }} );

        for (i = 0; i < req.body.ingredientes.length ; i++){
          const ingredientes = await db.IngredientProduct
            .create({ product_id: req.params.id,
                      ingredient_id: req.body.ingredientes[i] } );
        }

        if(typeof req.files.image_uploads != 'undefined'){
          for (i = 0; i < req.files.image_uploads.length ; i++){
            const foto = await db.Photo
              .create({ product_id: req.params.id,
                        nombre: req.files.image_uploads[i].filename } );
          }
        }

        return res.redirect(301, '/product' );
      } catch (error) {
         console.log(error);
      }
    }else{
      return res.render('productEdit',{ title: 'iChef - Editando el producto', errores: errores.errors });
    }
  },
    productDelete:function (req, res, next) {
        res.render('productDelete', { title: 'iChef - Producto borrado',
                                    usuario: req.session.usuarioLogueado });
    },
    deleteProductById: async function (req, res, next) {
      try {
        const productoDelete = await db.Product.destroy({
          include:[{association:"productType"},
                  {association:"marca"},
                  {association:"rubro"},
                  {association:"fotos"},
                  {association:"ingredientes"}],
          where: {id_product: req.params.idProducto }
        })
        if (productoDelete instanceof db.Product){
          return res.redirect(301, '/product' );
        }
      } catch (error) {
        console.log(error)
      }

    },
    searchProduct: function (req,res,next) {
      db.Product.findAll({
        include:[{association:"productType"},
                  {association:"marca"},
                  {association:"rubro"},
                  {association:"fotos"},
                  {association:"ingredientes"}],
        where: {descripcion:{
          [Op.substring]: req.body.buscarHeader}
        }
      })
      .then((productos)=>{
         //console.log(productos);
         return res.render('products', { title: 'iChef - Resultados de busqueda',
                                          productos: productos,
                                          usuario: req.session.usuarioLogueado});
        })
        .catch(function(error){
          return res.render('errordb', { title: 'Error',
                                         error: error,
                                         usuario: req.session.usuarioLogueado });
        });
    }
};

module.exports = productController;