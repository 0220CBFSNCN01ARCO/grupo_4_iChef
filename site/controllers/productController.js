const fs = require('fs');
const db = require('../database/models');
const { Op } = require("sequelize");

let productController = {
    productDetail: function (req, res, next) {
        res.render('productDetail', { title: 'Detalle productos',
                                      subtitle: 'Detalle producto',
                                      usuario: req.session.usuarioLogueado });
    },
    product_boxDetail: function (req, res, next) {
        res.render('product-boxDetail', { title: 'Detalle caja',
                                          subtitle: 'Detalle caja',
                                          usuario: req.session.usuarioLogueado });
    },
    productCart: function (req, res, next) {
        res.render('productCart', { title: 'Carrito compras',
                                    subtitle: 'Mi Carrito',
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
        res.render('products', { title: 'Listado',
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
        include:[{association: "productType"}]
      })
      .then((productos)=>{
        //console.log(productos);
        res.render('productList', { title: 'Listado',
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
                  {association:"fotosProd"},
                  {association:"ingredienteProd"} ]})
      .then((producto)=>{
        res.render('productDetail', { title: 'Producto ' + producto.codigo,
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
    productAdd: function (req, res, next) {
      res.render('productAdd', {  title: 'Crear producto',
                                  subtitle: 'Formulario alta',
                                  usuario: req.session.usuarioLogueado });
    },
    /*
    createProduct: function (req, res, next) {
      let esOferta = false;
      if(req.body.ofertaSwich =='on'){
        esOferta = true;
      }
      //console.log(req.body);
      let productosJson = fs.readFileSync('./data/products.json', {encoding: 'utf-8'});
      let productos = JSON.parse(productosJson);

      const ultimoItem = productos.length-1;
      let arrayIngredientes = [];
      if(req.body.ingredientes.length > 0){
        arrayIngredientes= req.body.ingredientes.slice();
      }
      let arrayFotos = [];
      if(req.body.fotos.length > 0){
        arrayFotos = req.body.fotos.slice();
      }

      let newProducto = {
        codigo: ultimoItem,
        descripcion: req.body.nombreProducto,
        tipo: req.body.tipo,
        precio: req.body.precioProducto,
        oferta: esOferta,
        precioOferta: req.body.precioOferta,
        descuentoOferta: req.body.descuento,
        grupo: req.body.grupo,
        marca: req.body.marca,
        descripcion: req.body.txtDescripcion,
        comensales: req.body.radioPersonas,
        ingredientes: arrayIngredientes,
        calorias: req.body.calorias,
        peso: req.body.peso,
        fotos: arrayFotos,
        receta: req.body.pdfFile
      }

      productos.push(newProducto);

      //console.log(productos);

      fs.writeFileSync('./data/products.json', JSON.stringify(productos));

      //res.render('productAdd', { title: 'Crear producto', subtitle: 'Formulario alta' });
      mensaje = `El Producto ${ newProducto.codigo }, ${ newProducto.nombre } fue creado exitosamente!!!`
      res.render('productMsg', { title: 'Producto creado',
                                    tipo: 'success',
                                    mensaje: mensaje,
                                    usuario: req.session.usuarioLogueado });
    },
    */
  
    createProduct: function (req, res, next) {
  
      let esOferta = 0;
      if(req.body.ofertaSwich =='on'){
      esOferta = 1;
      };

      let arrayFotos = [];
      if(req.body.fotos.length > 0){
        arrayFotos = req.body.fotos.slice();
      }
      let arrayIngredientes = [];
      if(req.body.ingredientes.length > 0){
        arrayIngredientes= req.body.ingredientes.slice();
      }

      db.Product.create({
          descripcion: req.body.nombreProducto,
          product_type_id: req.body.tipo,
          precio: req.body.precioProducto,
          oferta: esOferta,
          precio_oferta: req.body.precioOferta,
          descuento_oferta: req.body.descuento,
          rubro_id: req.body.grupo,
          marca_id :req.body.marca,
          detalle: req.body.txtDescripcion,
          cant_comensales: req.body.radioPersonas,
          calorias: req.body.calorias,
          peso: req.body.peso,
          receta: req.body.pdfFile,
          fotos: arrayFotos ,
          ingredientes: arrayIngredientes
      }, {
        include:[
        {association:"productType"},
        {association:"marca"},
        {association:"rubro"},
        {association:"fotos"},
        {association:"ingredientes"}
        ]
      }).then((productoNew)=>{
        mensaje = `El ${productoNew.descripcion} fue creado exitosamente!!!`
        res.render('productMsg', { title: 'Producto creado',
                                    tipo: 'success',
                                    mensaje: mensaje,
                                    usuario: req.session.usuarioLogueado });
      })
    },

    editProductById: function (req, res, next) {
      let idProducto = req.params.id;
      let productosJSON = fs.readFileSync('./data/products.json',{ encoding:'utf-8'});
      let productos;

      if(productosJSON == ""){
        productos = [];
      }else{
        productos = JSON.parse(productosJSON);
      }

      let productEdit = productos.filter(function (producto) {
        return producto.codigo == idProducto;
      });

      res.render('productEdit', { title: 'Editar',
                                  subtitle: 'Formulario edición',
                                  producto: productEdit,
                                  usuario: req.session.usuarioLogueado});
    },

    /*
      editProductById: function (req, res, next) {
        db.Product.findByPk(req.params.id, {include:[{association:"productType"}, {association:"marca"}, {association:"rubro"}, {association:"fotosProd"}, {association:"ingredienteProd"} ]})
        .then((producto)=>{
          res.render('productEdit', { title: 'Editar',
                                  subtitle: 'Formulario edición',
                                  producto: producto,
                                  usuario: req.session.usuarioLogueado});
        }
    },
    */

    saveProductById: function (req, res, next) {
      let esOferta = false;
      if(req.body.ofertaSwich =='on'){
        esOferta = true;
      }
      console.log(req.body);

      let productosJson = fs.readFileSync('./data/products.json', {encoding: 'utf-8'});
      let productos = JSON.parse(productosJson);

      const idProducto = req.params.id;
      //const ultimoItem = productos.length-1;
      let arrayIngredientes = [];
      if(req.body.ingredientes.length > 0){
        arrayIngredientes= req.body.ingredientes.slice();
      };
      let arrayFotos = [];
      if(req.body.fotos.length > 0){
        arrayFotos = req.body.fotos.slice();
      };

      let productEdited = {
        //codigo: ultimoItem,
        codigo: idProducto,
        nombre: req.body.nombreProducto,
        tipo: req.body.tipo,
        precio: req.body.precioProducto,
        oferta: esOferta,
        precioOferta: req.body.precioOferta,
        descuentoOferta: req.body.descuento,
        grupo: req.body.grupo,
        marca: req.body.marca,
        descripcion: req.body.txtDescripcion,
        comensales: req.body.radioPersonas,
        ingredientes: arrayIngredientes,
        calorias: req.body.calorias,
        peso: req.body.peso,
        fotos: arrayFotos,
        receta: req.body.pdfFile
      }

      productos.splice(idProducto-1,1,productEdited);
      //productos.push(newProducto);

      fs.writeFileSync('./data/products.json', JSON.stringify(productos));

      //res.render('productAdd', { title: 'Crear producto', subtitle: 'Formulario alta' });
      mensaje = `El Producto ${ productEdited.codigo }, ${ productEdited.nombre } fue editado exitosamente!!!`
      res.render('productMsg', { title: 'Producto editado',
                                    tipo: 'success',
                                    mensaje: mensaje,
                                  usuario: req.session.usuarioLogueado });
    },

    /*
      saveProductById: function (req, res, next) {
        db.Product.update({
          codigo: req.body.codigo,
          descripcion: req.body.nombreProducto,
          productType: {
            descripcion:req.body.tipo,
          },
          precio: req.body.precioProducto,
          oferta: esOferta,
          precio_oferta: req.body.precioOferta,
          descuento_oferta: req.body.descuento,
          rubro: {
            descripcion:req.body.grupo
          },
          marca: {
            descripcion:req.body.marca
          },
          detalle: req.body.txtDescripcion,
          cant_comensales: req.body.radioPersonas,
                ingredientes: ingredients.forEach(ingrediente=>{
                  ingrediente.descripcion:req.params
                })
                
                  //descripcion:arrayIngredientes
                },
                calorias: req.body.calorias,
                peso: req.body.peso,
                fotos: {
                  nombre:arrayFotos
                },
                receta: req.body.pdfFile
        },
        {
          where: {id:req.params.id }
        },
          {
            include:[{association:"productType"}, {association:"marca"}, {association:"rubro"}, {association:"fotosProd"}, {association:"ingredienteProd"} ]
          }
        )
        .then((productEdited)=>{
          mensaje = `El Producto ${ productEdited.id}, ${ productEdited.descripcion } fue editado exitosamente!!!`
          res.render('productMsg', { title: 'Producto editado',
                                     tipo: 'success',
                                     mensaje: mensaje,
                                     usuario: req.session.usuarioLogueado });
        },
    */

    productDelete:function (req, res, next) {
        res.render('productDelete', { title: 'Producto borrado',
                                    usuario: req.session.usuarioLogueado });
    },

    deleteProductById: function (req, res, next) {
      db.Product.destroy({
        where: {id: req.params.idProducto }
      })
      .then(function(result){
        console.log(result)
        mensaje = `El Producto fue eliminado exitosamente!!!`
        res.render('productMsg', { title: 'Producto borrado',
                                      tipo: 'success',
                                      mensaje: mensaje,
                                      usuario: req.session.usuarioLogueado });
      })
      .catch(function(error){
          return res.render('errordb', { title: 'Error',
                                         error: error,
                                         usuario: req.session.usuarioLogueado });
        });
    },
    searchProduct: function (req,res,next) {
      db.Product.findAll({
        include:[{association:"productType"},
                {association:"marca"},
                {association:"rubro"},
                {association:"fotos"}],
        where: {descripcion:{
          [Op.substring]: req.body.buscarHeader}
        }
      })
      .then((productos)=>{
         //console.log(productos);
         return res.render('products', { title: 'Resultados de busqueda',
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