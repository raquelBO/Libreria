const jwt = require('jsonwebtoken');

async function generarToken(idusuario){
    return await jwt.sign({sub: idusuario}, process.env.CLAVESECRETA, {expiresIn: '5min'});
}

async function refrescarToken(token){
    try{
        const datosToken = await jwt.verify(token, process.env.CLAVESECRETA);
        return await generarToken(datosToken.sub);
    }catch(e){
        console.log('Token invalido', e);
        return null;
    }
}

module.exports = { generarToken, refrescarToken }