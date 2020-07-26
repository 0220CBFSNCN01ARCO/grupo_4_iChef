const {Product} = require('../../database/models');

let apiProductsController = {

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


}



module.exports = apiProductsController;