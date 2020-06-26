const fs = require('fs');

let productController = {
    productDetail: function (req, res, next) {
        res.render('productDetail', { title: 'Detalle productos', subtitle: 'Detalle producto',usuario: req.session.usuarioLogueado });
    },
    
    product_boxDetail: function (req, res, next) {
        res.render('product-boxDetail', { title: 'Detalle caja', subtitle: 'Detalle caja',usuario: req.session.usuarioLogueado });
    },
    
    productCart: function (req, res, next) {
        res.render('productCart', { title: 'Carrito compras', subtitle: 'Mi Carrito',usuario: req.session.usuarioLogueado });
    },
    listarProductos: function (req, res, next) {
      let tipoProducto = req.params.tipo
      //console.log("Tipo de producto: " + tipoProducto);

      let productosJson = fs.readFileSync('./data/products.json', {encoding: 'utf-8'});
      let productos = JSON.parse(productosJson);

      let productFilter = productos.filter(function(product){
          return product.tipo == tipoProducto;
      });

      //console.log(productFilter);

      res.render('products', { title: 'Listado',
                             productos: productFilter,usuario: req.session.usuarioLogueado });
    },
    //hay que agregar campo nombre (caja/market) en modelo de ProductType
    //listar productos segun tipo
    /*
    listarProductos: function (req, res, next) {
        db.Product.findAll({include:[{model:ProductType, where: {product_type_id:req.params.tipo}}, {model:Brand}, {model:Heading}, {model:Photo}, {model:Ingredient} ]})
        .then((productos)=>{
          res.render('products', { title: 'Listado', usuario: req.session.usuarioLogueado, productos:productos});
        }
    },
    */

    listProduct: function (req, res, next) {
      let productosJSON = fs.readFileSync('./data/products.json',{ encoding:'utf-8'});
      let productos;

      if(productosJSON == ""){
        productos = [];
      }else{
        productos = JSON.parse(productosJSON);
      }

      res.render('productList', { title: 'Listado productos',
                                  product: productos, usuario: req.session.usuarioLogueado });
    },
    getProductById: function (req, res, next) {
      let idProducto = req.params.id;
      let productosJSON = fs.readFileSync('./data/products.json',{ encoding:'utf-8'});
      let productos;

      if(productosJSON == ""){
        productos = [];
      }else{
        productos = JSON.parse(productosJSON);
      }

      let productDetail = productos.filter(function (producto) {
        return producto.codigo == idProducto;
      });
      //console.log(productDetail);
      res.render('productDetail', { title: 'Producto ' + productDetail[0].codigo , subtitle: 'Detalle producto', producto: productDetail,usuario: req.session.usuarioLogueado});
    },

    /*
    getProductById: function (req, res, next) {
        db.Product.findByPk(req.params.id, {include:[{model:ProductType}, {model:Brand}, {model:Heading}, {model:Photo}, {model:Ingredient} ]})
        .then((producto)=>{
          res.render('productDetail', { title: 'Detalle productos', subtitle: 'Detalle producto',usuario: req.session.usuarioLogueado, producto:producto});
        }
    },
    */

    productAdd: function (req, res, next) {
      res.render('productAdd', { title: 'Crear producto', subtitle: 'Formulario alta',usuario: req.session.usuarioLogueado });
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
      if(req.body.ingredientes.length > 0){
        arrayIngredientes= req.body.ingredientes.slice();
      }
      let arrayFotos = [];
      if(req.body.fotos.length > 0){
        arrayFotos = req.body.fotos.slice();
      }

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

      //console.log(productos);

      fs.writeFileSync('./data/products.json', JSON.stringify(productos));

      //res.render('productAdd', { title: 'Crear producto', subtitle: 'Formulario alta' });
      mensaje = `El Producto ${ newProducto.codigo }, ${ newProducto.nombre } fue creado exitosamente!!!`
      res.render('productMsg', { title: 'Producto creado',
                                    tipo: 'success',
                                    mensaje: mensaje,
                                    usuario: req.session.usuarioLogueado });
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
      }
      let arrayFotos = [];
      if(req.body.fotos.length > 0){
        arrayFotos = req.body.fotos.slice();
      }

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
    productDelete:function (req, res, next) {
      res.render('productDelete', { title: 'Producto borrado', usuario: req.session.usuarioLogueado });
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

      let newProductos = productos.filter(function (producto) {
        return producto.codigo != idProducto;
      });

      let productoBorrado = productos.find(function (producto) {
        return producto.codigo == idProducto;
      });

      fs.writeFileSync('./data/products.json', JSON.stringify(newProductos, { encoding: 'UTF-8'}) );

      mensaje = `El Producto ${ productoBorrado.codigo }, ${ productoBorrado.nombre } eliminado exitosamente!!!`
      res.render('productMsg', { title: 'Producto borrado',
                                    tipo: 'success',
                                    mensaje: mensaje,
                                    usuario: req.session.usuarioLogueado });
    }
};


module.exports = productController;