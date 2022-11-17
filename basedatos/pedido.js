const PRODUCTOS = require('../lista-productos');
const conexion = require ('./conexion');

async function insertar(pedido){
    try{
        await conexion.execute('INSERT INTO pedido(idpedido, idusuario, fechaPedido, fechaPedido ) VALUE(?,?,?,?)',[ pedido.idpedido, pedido.idusuario, pedido.fechaPedido, pedido.fechaEntrega]);
    }catch(error){
        console.log('Error al insertar pedido en el base de datos');
        console.log(error);
        throw error;
    }
}

async function consultar(){
    try{
       const [rows, fielde] =  await conexion.execute('SELECT *FROM vista_pedido');
       return rows;
    }catch(error){
        console.log('Error al consultar pedido de la base de datos ');
        console.log(error);
        throw error;
    }
}

async function update(pedido) {
    try {
        await conexion.execute('UPDATE pedido SET  idusuario = ?,  fechaPedido= ?, fechaEntrega = ?, WHERE idpedido = ?', [pedido.idusuario, pedido.fechaPedido, pedido.fechaEntrega, pedido.idpedido]);
    } catch (error) {
        console.log('Error al editar pedido');
        console.log(error);
        throw error;
    }
}

async function eliminar(idpedido) {
    try {
        await conexion.execute('DELETE FROM pedido WHERE idpedido = ? ', [idpedido]);
    } catch (error) {
        console.log('Error al eliminar pedido');
        console.log(error);
        throw error;
    }
}


module.exports = { insertar, consultar, update, eliminar };
