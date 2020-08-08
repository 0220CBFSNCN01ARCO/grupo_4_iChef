const fs = require('fs');
const db = require('../database/models');

async function recordameMiddleware (req, res, next){
    //console.log("Estoy en el recordameMiddleware usuariologueado:" , req.session.usuarioLogueado );
    //console.log("Estoy en el middlewaresesion:" , req.session );
    //console.log("Estoy en recordameMiddleware cookies:" , req.cookies.recordame );

    if(req.cookies.recordame && !req.session.usuarioLogueado){
      const usuario = await db.User.findOne({ where: { email: req.cookies.recordame } });
      //console.log("Usuario: ",usuario);
      if(usuario){
        req.session.usuarioLogueado = {
                              id: usuario.id,
                              mail: usuario.email,
                              nombre: usuario.nombre,
                              apellido: usuario.apellido,
                              avatar: usuario.avatar
                          };
        console.log("Usuario recordado: ",req.session.usuarioLogueado);
      }
    };
    next();
    }

module.exports = recordameMiddleware;