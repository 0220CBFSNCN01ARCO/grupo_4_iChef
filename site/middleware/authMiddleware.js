function authMiddleware(req, res, next) {

    if (req.session.usuarioLogueado) {
        console.log("Usuario authMiddleware: ",req.session.usuarioLogueado);
        next();
    } else {
        console.log("Usuario no logueado. AuthMiddleware.")
        return res.redirect(301, "/users/login");
    }
}



module.exports = authMiddleware
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