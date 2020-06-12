function authMiddleware (req, res, next){
    if(req.session.usuarioLogueado != undefined){
        next();
    } else {
        //console.log("Usuario no logueado.")
        return res.redirect("/users/login");
    }
}

module.exports = authMiddleware