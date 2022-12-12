const conexion = require ('./conexion');

async function insertar(detallesPedido){
    try{
        await conexion.execute('INSERT INTO detallesPedido(idpedido, idproducto, cantidad, precio) VALUES(?,?,?,?)',[ detallesPedido.idpedido, detallesPedido.idproducto, detallesPedido.cantidad, detallesPedido.precio]);
    }catch(error){
        console.log('Error al insertar detallesPedido en el base de datos');
        console.log(error);
        throw error;
    }
}

async function consultar(){
    try{
       const [rows, fielde] =  await conexion.execute('SELECT * FROM vista_detallesPedido');
       return rows;
    }catch(error){
        console.log('Error al consultar detallesPedido de la base de datos', error);
        throw error;
    }
}

async function consultarPorIdPedido(idpedido){
    try{
        const [rows] = await conexion.query("SELECT * FROM vista_detallesPedido WHERE idpedido = ?", [idpedido]);
        return rows;
    }catch(error){
        console.error('Error al consultar pedido por id', error);
        throw error;
    }
}

async function update(detallesPedido) {
    try {
        const [resp] = await conexion.execute(
            'UPDATE detallespedido SET  idproducto = ?,  cantidad = ?, precio = ?,  idpedido = ? WHERE iddetallesPedido = ?', 
            [detallesPedido.idproducto, detallesPedido.cantidad, detallesPedido.precio, detallesPedido.idpedido,  detallesPedido.iddetallesPedido]
            );
    } catch (error) {
        console.log('Error al editar detallesPedido', error);
        throw error;
    }
}

async function eliminar(iddetallesPedido) {
    try {
        await conexion.execute('DELETE FROM pedido WHERE iddetallesPedido = ?', 
        [iddetallesPedido]
        );
    } catch (error) {
        console.log('Error al eliminar detallesPedido', error);
        throw error;
    }
}

async function eliminarPorIdPedido(idpedido){
    try{
        await conexion.execute('DELETE FROM detallesPedido WHERE idpedido = ?', [idpedido]);
    }catch(error){
        console.log('Error al eliminar detallesPedidos por idpedido', error);
        throw error;
    }
}

module.exports = { insertar, consultar, update, eliminar, consultarPorIdPedido, eliminarPorIdPedido }
