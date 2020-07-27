const {Product} = require('../../database/models');
const {Heading} = require('../../database/models');

const getPagination = (page, size) => {//0,5
  const limit = size ? +size: 10;
  const offset = page ? page * limit: 0;
  console.log("LIMITE: " + limit + " - OFFSET: " + offset);
  return { limit, offset };
};
const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: datos } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, datos, totalPages, currentPage };
};

let apiProductsController = {
    listProducts: async function (req, res, next) {
      let lim = 10;
      let off;
      let page = req.query.page;

      if(typeof page != undefined){ off = (page - 1) * lim }else { off = 0 }
      console.log("Pagina: ",page);
      console.log("LIMIT: ",lim);
      console.log("OFFSET: ",off);
      try {
        const listProduct = await Product.findAll({
          include:[{association: "productType"},
                   {association: "marca"},
                   {association: "rubro"},
                   {association: "fotos"},
                   {association: "productStatus"}],
                   offset: 0,
                   limit: 10,
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
        const totalPages = Math.ceil(listProduct.length / lim);
        let pageNext = `/api/products/?page=${pageNext}`
        let pagePrevious = 0

        let endProduct = {
          "count": listProduct.length,
          "next": pageNext,
          "previous": null,
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