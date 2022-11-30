const { Router } = require("express");
const router = Router();
const tablaUsuario = require('../basedatos/usuario');

router.get("/",async (peti,resp)=>{
    try{
        const listaUsuario = await tablaUsuario.consultar();
        /*setTimeout(() => {
            respuesta.json(listaUsuario);
        }, 3000);*/ 
        resp. json(listaUsuario);
    }catch(e){
        resp.status(500).send(e.massage);
    }
});

//post
router.post('/', async (peti, resp) => {
    try {
        const usuarioRecibido = peti.body;
        console.log(usuarioRecibido);
        await tablaUsuario.insertar(usuarioRecibido);
        resp.sendStatus(200);
    } catch (e) {
        resp.status(500).send(e.message);
    }

});


//put
router.put('/', async (peti, resp) => {
    try {
        const usuarioRecibido = peti.body;
        console.log(usuarioRecibido);
        await tablaUsuario.update(usuarioRecibido);
        resp.sendStatus(200);
    } catch (error) {
        resp.status(500).send(error.message);
    }

});

//delete
router.delete('/:idusuario', async (peti, resp) => {
    try {
        const idusuarioRecibido = peti.params.idusuario;
        console.log(idusuarioRecibido);
        await tablaUsuario.eliminar(idusuarioRecibido);
        resp.sendStatus(200);
    } catch (error) {
        resp.status(500).send(error.message);
    }
});

module.exports = router;
