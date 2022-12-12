const jwt = require('jsonwebtoken');

async function generarToken(idusuario, admin){
    return await jwt.sign({sub: idusuario, admin}, process.env.CLAVESECRETA, {expiresIn: '5min'});
}

async function refrescarToken(token){
    try{
        const datosToken = await jwt.verify(token, process.env.CLAVESECRETA);
        return await generarToken(datosToken.sub, datosToken.admin);
    }catch(e){
        console.log('Token invalido', e);
        return null;
    }
}

module.exports = { generarToken, refrescarToken }