const { Router } = require("express");
const router = Router();
const tablaDetallesPedido = require('../basedatos/detallesPedido');

router.get("/",async (peti,resp)=>{
    try{
        const listadetallesPedido = await tablaDetallesPedido.consultar();
        /*setTimeout(() => {
            respuesta.json(listadetallesPedido);
        }, 3000);*/ 
        resp. json(listadetallesPedido);
    }catch(e){
        resp.status(500).send(e.massage);
    }
});

//post
router.post('/', async (peti, resp) => {
    try {
        const detallesPedidoRecibido = peti.body;
        console.log(detallesPedidoRecibido);
        await tablaDetallesPedido.insertar(detallesPedidoRecibido);
        resp.sendStatus(200);
    } catch (e) {
        resp.status(500).send(e.message);
    }

});


//put
router.put('/', async (peti, resp) => {
    try {
        const detallesPedidoRecibido = peti.body;
        console.log(detallesPedidoRecibido);
        await tablaDetallesPedido.update(detallesPedidoRecibido);
        resp.sendStatus(200);
    } catch (error) {
        resp.status(500).send(error.message);
    }

});

//delete
router.delete('/:idpedido', async (peti, resp) => {
    try {
        const iddetallesPedidoRecibido = peti.params.idpedido;
        console.log(iddetallesPedidoRecibido);
        await tablaPedido.eliminar(iddetallesPedidoRecibido);
        resp.sendStatus(200);
    } catch (error) {
        resp.Status(500).send(error.message);
    }
});

module.exports = router;
