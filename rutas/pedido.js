const { Router } = require("express");
const router = Router();
const tablaPedido = require('../basedatos/pedido');

router.get("/", async (peti,resp)=>{
    try{
        let listaPedido = [];
        console.log(peti)
        const { idusuario } = peti.query;
        console.log('idusuario recibido -> ', idusuario);
        if(idusuario != null){
            listaPedido = await tablaPedido.consultarPorUsuario(idusuario);
        }else{
            listaPedido = await tablaPedido.consultar();     
        }
        resp.json(listaPedido);
        /*setTimeout(() => {
            respuesta.json(listaPedido);
        }, 3000);*/
    }catch(e){
        console.error('Error al consultar pedidos ', e)
        resp.status(500).send(e.massage);
    }
});

/*router.get('/:idusuario', async (peti, resp)=>{
    try{
        const { idusuario } = peti.params;
        const listaPedido = await tablaPedido.consultarPorUsuario(idusuario);
        resp.json(listaPedido);
    }catch(error){
        console.log(error);
        resp.status(500).send(e.message);
    }
})*/

//post
router.post("/", async (peti, resp) => {
    try {
        const pedidoRecibido = peti.body;
        console.log(pedidoRecibido);
        await tablaPedido.insertar(pedidoRecibido);
        resp.sendStatus(200);
    } catch (error) {
        resp.status(500).send(error.message);
    }
});


//put
router.put("/", async (peti, resp) => {
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
router.delete("/:idpedido", async (peti, resp) => {
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
