const fs = require('fs');

let productController = {
    productDetail: function (req, res, next) {
        res.render('productDetail', { title: 'Detalle productos', subtitle: 'Detalle producto' });
    },
    product_boxDetail: function (req, res, next) {
        res.render('product-boxDetail', { title: 'Detalle caja', subtitle: 'Detalle caja' });
    },
    productCart: function (req, res, next) {
        res.render('productCart', { title: 'Carrito compras', subtitle: 'Mi Carrito' });
    },
    productMarket: function (req, res, next) {
        res.render('market', { title: 'Market', subtitle: 'Market productos' });
    },
    listProduct: function (req, res, next) {
      let productosJSON = fs.readFileSync('./data/products.json',{ encoding:'utf-8'});
      let productos;

      if(productosJSON == ""){
        productos = [];
      }else{
        productos = JSON.parse(productosJSON);
      }

      res.render('productList', { title: 'Listado productos',
                                  product: productos });
    },
    getProductById: function (req, res, next) {
      res.render('productAdd', { title: 'Producto id', subtitle: 'Detalle producto' });
    },

    productAdd: function (req, res, next) {
      res.render('productAdd', { title: 'Crear producto', subtitle: 'Formulario alta' });
    },

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
      arrayIngredientes= req.body.ingredientes.slice();
      let arrayFotos = [];
      arrayFotos = req.body.fotos.slice();

      let newProducto = {
        codigo: ultimoItem,
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

      productos.push(newProducto);

      console.log(productos);

      fs.writeFileSync('./data/products.json', JSON.stringify(productos));

      //res.render('productAdd', { title: 'Crear producto', subtitle: 'Formulario alta' });
      mensaje = `El Producto ${ newProducto.codigo }, ${ newProducto.nombre } fue creado exitosamente!!!`
      res.render('productMsg', { title: 'Producto creado',
                                    tipo: 'success',
                                    mensaje: mensaje });
    },

    editProductById: function (req, res, next) {

      res.render('productAdd', { title: 'Editar', subtitle: 'Formulario edición'  });
    },
    saveProductById: function (req, res, next) {

      res.render('productAdd', { title: 'Guardar' });
    },
    productDelete:function (req, res, next) {

      res.render('productDelete', { title: 'Producto borrado' });
    },
    deleteProductById: function (req, res, next) {
      let idProducto = req.params.idProducto;
      let productosJSON = fs.readFileSync('./data/products.json',{ encoding:'utf-8'});
      let productos;

      if(productosJSON == ""){
        productos = [];
      }else{
        productos = JSON.parse(productosJSON);
      }

      let newPorductos = productos.filter(function (producto) {
        return producto.codigo != idProducto;
      });

      let productoBorrado = productos.find(function (producto) {
        return producto.codigo == idProducto;
      });

      fs.writeFileSync('./data/products.json', JSON.stringify(newPorductos, { encoding: 'UTF-8'}) );

      mensaje = `El Producto ${ productoBorrado.codigo }, ${ productoBorrado.nombre } eliminado exitosamente!!!`
      res.render('productMsg', { title: 'Producto borrado',
                                    tipo: 'success',
                                    mensaje: mensaje });
    }
};

module.exports = productController;