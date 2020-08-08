
/*
function authMiddleware(req, res, next) {
    console.log("Usuario authMiddleware: ",req.session.usuarioLogueado);
    if (req.session.usuarioLogueado) {  
        next();
    } else {
        console.log("Usuario no autorizado.")
        return res.redirect(401,"/users/login");
    }
}*/

const userLogged = (req,res,next) => {
    if(req.session.usuarioLogueado){
        return res.redirect('/')
    }
    next();
}

const userNotLogged = (req,res,next) => {
    //console.log("Usuario session: ", req.session.usuarioLogueado);
    if(!req.session.usuarioLogueado){
        //console.log("Usuario no logueado.")
        return res.redirect('/users/login');
    }
    next();
}


module.exports = {userLogged, userNotLogged}
    /*
    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            return res.redirect(301, "/users/login");
        }
    }

    function notLoggedIn(req, res, next) {
        if (!req.isAuthenticated()) {
            return next()
        } else {
           return res.redirect(301, "/users/login");
        }
    }

    module.exports = {
        isLoggedIn,
        notLoggedIn
    };
    */