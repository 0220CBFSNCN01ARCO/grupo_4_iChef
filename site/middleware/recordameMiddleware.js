const fs = require('fs');

function recordameMiddleware (req, res, next){
    //console.log("Estoy en el middleware: usuariologueado " + req.session.usuarioLogueado );
    //console.log("Estoy en el middleware: sesion " + req.session );
    if(req.cookies.recordame != undefined && req.session.usuarioLogueado == undefined){
      let usuariosJSON = fs.readFileSync('./data/users.json',{ encoding:'utf-8'});
      let users;
      if(usuariosJSON == ""){
        users = [];
      }else{
        users = JSON.parse(usuariosJSON);
      }
        let usuarioLoguear;
        for(let i = 0; i < users.length; i++){
            if(users[i].email == req.cookies.recordame) {
                usuarioLoguear = users [i];
                break;
            }
        }
        req.session.usuarioLogueado = usuarioLoguear
      };
      next();
    }

module.exports = recordameMiddleware;