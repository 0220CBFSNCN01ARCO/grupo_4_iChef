function authMiddleware (req, res, next){
    if(req.session.usuarioLogueado != undefined){
        next();
    } else {
        //console.log("Usuario no logueado.")
        return res.redirect("/users/login");
    }

}



module.exports = authMiddleware
/*
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        return res.redirect('/login');
    }
}

function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next()
    } else {
        return res.redirect('/login');
    }
}

module.exports = {
    isLoggedIn,
    notLoggedIn
};
*/