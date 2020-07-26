
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
            res.json(endUser);
        } catch (error) {
            res.json(200, msg = {error: "No se pudo obtener el listado de usuarios."})
        }
      }


}



module.exports = apiUsersController;