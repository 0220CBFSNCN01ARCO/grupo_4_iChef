const {Product} = require('../../database/models');
const {Heading} = require('../../database/models');

let apiProductsController = {
    listProducts: async function (req, res, next) {
      try {
        const listProduct = await Product.findAll({
          include:[{association: "productType"},
                   {association: "marca"},
                   {association: "rubro"},
                   {association: "fotos"},
                   {association: "productStatus"}]
        });
        const countByCategory = await Product.findAll({
          attributes: ["rubro.descripcion",[Heading.sequelize.fn('COUNT', 'rubro.id'), 'countRubro']],
          include:[{association: "rubro",
                    attributes: []}],
          group: 'Product.rubro_id',
          raw:true
        });
        //console.log(listProduct);
        let arrayProduct = [];
        for(let i=0;i< listProduct.length;i++){
            let productAdd = {
                "id": listProduct[i].id_product,
                "name": listProduct[i].descripcion,
                "descripcion":listProduct[i].detalle,
                "detail": `/api/products/${ listProduct[i].id_product }`
            }
            arrayProduct.push(productAdd);
        }
        let endProduct = {
          "count": listProduct.length,
          "countByCategory": countByCategory,
          "products": arrayProduct
        }
        return res.status(200).json(endProduct);
      } catch (error) {
        //console.log(error)
        return res.status(500).json(msg = {codigo: 500,
          error: "No se pudo obtener el listado de productos."});
      }
      },

    productByID: async function (req, res, next) {
        try {
            const productFind = await Product.findByPk(req.params.id,{
              include:[{association: "productType"},
                   {association: "marca"},
                   {association: "rubro"},
                   {association: "fotos"},
                   {association: "productStatus"}]
            });
            if (!productFind){
                return res.status(404).json(
                            msg = {codigo: 404,
                                   error: "No se encontro el producto."});
            }
            let data = {
                  "id_product": productFind.id_product,
                  "codigo": productFind.codigo,
                  "descripcion": productFind.descripcion,
                  "precio": productFind.precio,
                  "precio_oferta": productFind.precio_oferta,
                  "descuento_oferta": productFind.descuento_oferta,
                  "detalle": productFind.detalle,
                  "cant_comensales": productFind.cant_comensales,
                  "calorias": productFind.calorias,
                  "peso": productFind.peso,
                  "receta": productFind.receta
            }
            let arrayRelaciones = [];
            arrayRelaciones.push({"productType": `${ productFind.productType.descripcion }`});
            arrayRelaciones.push({"marca": `${ productFind.marca.descripcion }`});
            arrayRelaciones.push({"rubro": `${ productFind.rubro.descripcion }`});
            arrayRelaciones.push({"productStatus": `${ productFind.productStatus.descripcion }`});

            //console.log(productFind);
            let endProduct = {
                "id_product": productFind.id_product,
                "codigo": productFind.codigo,
                "descripcion": productFind.descripcion,
                "precio": productFind.precio,
                "precio_oferta": productFind.precio_oferta,
                "descuento_oferta": productFind.descuento_oferta,
                "detalle": productFind.detalle,
                "cant_comensales": productFind.cant_comensales,
                "calorias": productFind.calorias,
                "peso": productFind.peso,
                "receta": productFind.receta,
                "relaciones": arrayRelaciones,
                "urlImagen": `images/users/${ productFind.fotos[0].nombre }`
            }
            //■ una propiedad por cada campo en base
            //■ un array por cada relación de uno a muchos (categories, colors,sizes, etc)
            //■ Una URL para la imagen del producto (para mostrar la imagen)

            return res.status(200).json(endProduct);
        } catch (error) {
            return res.status(500).json(
                msg = {codigo: 500,
                        error: "No se pudo obtener el producto."});
        }
    }


}



module.exports = apiProductsController;