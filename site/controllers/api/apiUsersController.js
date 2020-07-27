
const {User} = require('../../database/models');

let apiUsersController = {

    listUsers: async function (req, res, next) {
        try {
            let usuarios = await User.findAll(
                {include:[{association: "categoriaUsuario"},
                          {association: "estadoUsuario"} ]}
              )
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
            let endUser = {
                "count": usuarios.length,
                "users": arrayUser
            }
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