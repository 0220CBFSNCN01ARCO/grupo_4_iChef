
const {User} = require('../../database/models');

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

let apiUsersController = {

    listUsers: async function (req, res, next) {
        let lim = 10;
        let off = 0;
        let page = Number(req.query.page);

        if(!isNaN(page)){
            off = (page - 1) * lim
        }else{
            page = 1
        }

        try {
            let usuarios = await User.findAll(
                {include:[{association: "categoriaUsuario"},
                          {association: "estadoUsuario"} ,
                           ],
                           offset: off,
                           limit: lim, })
            let arrayUser = [];
            for(let i=0;i< usuarios.length;i++){
                let userAdd = {
                    "id": usuarios[i].id,
                    "name": usuarios[i].nombre,
                    "email": usuarios[i].email,
                    "detail": `/api/users/${ usuarios[i].id }`
                }
                arrayUser.push(userAdd);
            }
            const totalPages = Math.ceil(usuarios.length / lim);
            let pageNext;
            let pagePrevious;

            if(page == totalPages){
                pageNext = null;
                if(page == 1){
                    pagePrevious = null;
                }else{
                    pagePrevious = `/api/users/?page=${ page - 1 }`;
                }
            }else{
                pageNext = `/api/users/?page=${ page + 1 }`;
                if(page == 1){
                    pagePrevious = null;
                }else{
                    pagePrevious = `/api/users/?page=${ page-1 }`;
                }
            }

            console.log("Pagina: ",page);
            console.log("LIMIT: ",lim);
            console.log("OFFSET: ",off);
            console.log("pageNext: ",pageNext);
            console.log("pagePrevious: ",pagePrevious);

            let endUser = {
                "count": usuarios.length,
                "next": pageNext,
                "previous": pagePrevious,
                "users": arrayUser
            }
            res.setHeader('Access-Control-Allow-Origin', '*');
            return res.status(200).json(endUser);
        } catch (error) {
            return res.status(500).json(msg = {codigo: 500,
                        error: "No se pudo obtener el listado de usuarios."});
        }
    },
    userByID: async function (req, res, next) {
        try {
            const userFind = await User.findByPk(req.params.id)
            if (!userFind){
                return res.status(404).json(
                            msg = {codigo: 404,
                                   error: "No se encontro el usuario."});
            }
            let endUser = {
                "id": userFind.id,
                "nombre": userFind.nombre,
                "apellido": userFind.apellido,
                "email": userFind.email,
                "nroTelefono": userFind.nroTelefono,
                "avatar": userFind.avatar,
                "urlAvatar": `images/users/${ userFind.avatar }`
            }
            return res.status(200).json(endUser);
        } catch (error) {
            return res.status(500).json(
                msg = {codigo: 500,
                        error: "No se pudo obtener el usuario."});
        }
    }

}



module.exports = apiUsersController;