const {Product} = require('../../database/models');
const {Heading} = require('../../database/models');

const { QueryTypes } = require('sequelize');
const Sequelize = require('sequelize');
const db = require('../../database/models');

let apiCategoriesController = {
    /*listCategories: async function (req, res, next) {
        try {
          const categories = await Product.findAll({
            attributes: ["rubro.descripcion",[Heading.sequelize.fn('COUNT', 'rubro.id'), 'countRubro']],
            include:[{association: "rubro",
                      attributes: []}],
            group: 'Product.rubro_id',
            raw:true
          });
          res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
          return res.status(200).json(categories);

        } catch (error) {
          //console.log(error)
          return res.status(500).json(msg = {codigo: 500,
            error: "No se pudo obtener el listado de categorias."});
        }
    }*/

    listCategories: async function (req, res, next) {
      try {
        const categories = await db.sequelize
          .query("SELECT `h`.descripcion,SUM(CASE WHEN `p`.id_product IS NOT NULL THEN 1 ELSE 0 END) As countRubro FROM  `heading` as `h` LEFT JOIN `product` as `p` ON `p`.`rubro_id` = `h`.`id` group by 1",
                  { type: QueryTypes.SELECT });
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
        return res.status(200).json(categories);

      } catch (error) {
        console.log(error)
        return res.status(500).json(msg = {codigo: 500,
          error: "No se pudo obtener el listado de categorias."});
      }
  }


}

module.exports = apiCategoriesController;