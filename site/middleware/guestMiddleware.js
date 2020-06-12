function guestMiddleware (req, res, next){
    if(req.session.usuarioLogueado == undefined){
        next();
    } else {
       return res.redirect("/info/guest");
    }
}

module.exports = guestMiddleware