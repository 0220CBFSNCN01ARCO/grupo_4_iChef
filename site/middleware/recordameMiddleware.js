function recordameMiddleware (req, res, next){
    next();

    if(req.cookie.recordame != undefined && req.session.usuarioLogueado == undefined){
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

    }

module.exports = recordameMiddleware;