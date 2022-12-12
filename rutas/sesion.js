const { Router } = require ('express');
const router = Router();
const tablaUsuario = require('./../basedatos/usuario');
const jwt = require('jsonwebtoken');
const jwtUtils = require('./../utilidades/token-utils');

router.post("/iniciar", async (peticion, respuesta)=>{
    try{
       const { ci, password } = peticion.body;
       const usuario = await tablaUsuario.getUsuarioPorCi(ci, password);
       if(usuario){
          const token = await jwtUtils.generarToken(usuario.idusuario, usuario.idtipo === 1);
          respuesta.json({token});
        }else{
            respuesta.sendStatus(401);
        }
     }catch(e){
        console.error('Error al iniciar sesion', e);
        respuesta.status(500).send(e.message);
     } 
});

router.post("/mantener", async (peticion, respuesta)=>{
   try{
      const { token } = peticion.body;
      const tokenNuevo = await jwtUtils.refrescarToken(token);
       if(tokenNuevo){
            respuesta.json({token: tokenNuevo});
         }else{
            respuesta.sendStatus(403);
         }
      }catch(e){
         console.error('Error al mantener sesion', e);
         respuesta.status(500).send(e.message);
      }
});

module.exports = router;