const { Router} = require('express');
const router = Router();
const tablaProducto = require('./../basedatos/producto');


//get
router.get('/', async (peti, resp) => {
    try {
        const listaProducto = await tablaProducto.consultar();
        /*setTimeout(() => {
            respuesta.json(listaProducto);
        }, 3000);*/
        resp.json(listaProducto);
    } catch (e) {
        resp.status(500).send(e.message);
    }
});

//post
router.post('/', async (peti, resp) => {
    try {
        const productoRecibido = peti.body;
        console.log(productoRecibido);
        await tablaProducto.insertar(productoRecibido);
        resp.sendStatus(200);
    } catch (e) {
        resp.status(500).send(e.message);
    }

});


//put
router.put('/', async (peti, resp) => {
    try {
        const productoRecibido = peti.body;
        console.log(productoRecibido);
        await tablaProducto.update(productoRecibido);
        resp.sendStatus(200);
    } catch (error) {
        resp.status(500).send(error.message);
    }

});

//delete
router.delete('/:idproducto', async (peti, resp) => {
    try {
        const idproductoRecibido = peti.params.idproducto;
        console.log(idproductoRecibido);
        await tablaProductos.eliminar(idproductoRecibido);
        resp.sendStatus(200);
    } catch (error) {
        resp.status(500).send(error.message);
    }
});

module.exports = router;





