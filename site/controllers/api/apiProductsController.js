const {Product} = require('../../database/models');
const {Heading} = require('../../database/models');

let apiProductsController = {
    listProducts: async function (req, res, next) {
      let lim = 10;
      let off = 0;
      let page = Number(req.query.page);

      if(!isNaN(page)){
          off = (page - 1) * lim
      }else{
          page = 1
      }

      try {
        const listProduct = await Product.findAll({
          include:[{association: "productType"},
                   {association: "marca"},
                   {association: "rubro"},
                   {association: "fotos"},
                   {association: "productStatus"}],
                   offset: off,
                   limit: lim,
        });
        if (listProduct.length == 0 ){
          return res.status(404).json(msg = {codigo: 404,
            error: `No hay registros que mostrar en la page ${ page }.`});
        }
        const countByCategory = await Product.findAll({
          attributes: ["rubro.descripcion",[Heading.sequelize.fn('COUNT', 'rubro.id'), 'countRubro']],
          include:[{association: "rubro",
                    attributes: []}],
          group: 'Product.rubro_id',
          raw:true
        });
        let objCategory = {}
        for(let i=0;i< countByCategory.length;i++){
          objCategory[countByCategory[i].descripcion] = countByCategory[i].countRubro
        }
        //console.log(listProduct);
        let arrayProduct = [];
        for(let i=0;i< listProduct.length;i++){
            let productAdd = {
                "id": listProduct[i].id_product,
                "name": listProduct[i].descripcion,
                "descripcion":listProduct[i].detalle,
                "detail": `/api/products/${ listProduct[i].id_product }`,
                "urlImagen": `images/products/${listProduct[i].productType.id}/${listProduct[i].id_product}/${ listProduct[i].fotos[0].nombre }`
            }
            arrayProduct.push(productAdd);
        }
        const totalPages = Math.ceil(listProduct.length / lim);
        let pageNext;
        let pagePrevious;

        if(page == totalPages){
            pageNext = null;
            if(page == 1){
                pagePrevious = null;
            }else{
                pagePrevious = `/api/products/?page=${ page - 1 }`;
            }
        }else{
            pageNext = `/api/products/?page=${ page + 1 }`;
            if(page == 1){
                pagePrevious = null;
            }else{
                pagePrevious = `/api/products/?page=${ page-1 }`;
            }
        }

        //console.log("Pagina: ",page);
        //console.log("LIMIT: ",lim);
        //console.log("OFFSET: ",off);
        //console.log("pageNext: ",pageNext);
        //console.log("pagePrevious: ",pagePrevious);

        let endProduct = {
          "count": listProduct.length,
          "next": pageNext,
          "previous": pagePrevious,
          "countByCategory": objCategory,
          "products": arrayProduct
        }

        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
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
                                   error: `No se encontro el producto con el id ${ req.params.id }.`});
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
                "urlImagen": `images/products/${productFind.productType.id}/${productFind.id_product}/${ productFind.fotos[0].nombre }`
            }
            //■ una propiedad por cada campo en base
            //■ un array por cada relación de uno a muchos (categories, colors,sizes, etc)
            //■ Una URL para la imagen del producto (para mostrar la imagen)
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
            return res.status(200).json(endProduct);
        } catch (error) {
            return res.status(500).json(
                msg = {codigo: 500,
                        error: `No se pudo obtener datos del id de producto ${ req.params.id }.`});
        }
    }


}

module.exports = apiProductsController;