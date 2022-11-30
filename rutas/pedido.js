const { Router } = require("express");
const router = Router();
const tablaPedido = require('../basedatos/pedido');

router.get("/",async (peti,resp)=>{
    try{
        const listaPedido = await tablaPedido.consultar(); 
        resp. json(listaPedido);
        /*setTimeout(() => {
            respuesta.json(listaPedido);
        }, 3000);*/
    }catch(e){
        resp.status(500).send(e.massage);
    }
});

//post
router.post('/', async (peti, resp) => {
    try {
        const pedidoRecibido = peti.body;
        console.log(pedidoRecibido);
        await tablaPedido.insertar(pedidoRecibido);
        resp.sendStatus(200);
    } catch (e) {
        console.error("error al registrar", e);
        resp.status(500).send(e.message);
    }

});


//put
router.put('/', async (peti, resp) => {
    try {
        const pedidoRecibido = peti.body;
        console.log(pedidoRecibido);
        await tablaPedido.update(pedidoRecibido)
        resp.sendStatus(200);
    } catch (error) {
        resp.status(500).send(error.message);
    }

});

//delete
router.delete('/:idpedido', async (peti, resp) => {
    try {
        const idpedidoRecibido = peti.params.idpedido;
        console.log(idpedidoRecibido);
        await tablaPedido.eliminar(idpedidoRecibido);
        resp.sendStatus(200);
    } catch (error) {
        resp.status(500).send(error.message);
    }
});

module.exports = router;
