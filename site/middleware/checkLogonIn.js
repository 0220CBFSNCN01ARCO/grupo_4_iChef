function checkLogonIn (req, res, next){

    if(req.session.usuarioLogueado){
        console.log("No hay un Usuario.");
        next();
    } else {
       console.log("Usuario checkLogonIn: ",req.session.usuarioLogueado);
       return res.redirect("/");
    }
}

module.exports = checkLogonIn