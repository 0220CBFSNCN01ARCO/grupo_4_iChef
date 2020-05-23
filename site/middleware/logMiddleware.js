const fs = require('fs');
const moment = require('moment');

function saveLogMiddleware(req,res,next){
    let registro = moment().format('DD/MM/YYYY hh:mm:ss');
    fs.appendFileSync('./data/log.txt', registro + ` - Se ingreso a: `+ req.url + '\n');
    next();
}

module.exports = saveLogMiddleware;