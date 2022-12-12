const conexion = require ('./conexion');
const tablaDetalle = require('./detallesPedido')

async function insertar(pedido){
    try{
        const fechaPedido = new Date(pedido.fechaPedido);
        const fechaEntrega = new Date(pedido.fechaEntrega);
        const [resultado] = await conexion.execute('INSERT INTO pedido(idusuario, fechaPedido, fechaEntrega ) VALUES(?,?,?)',[ pedido.idusuario, fechaPedido, fechaEntrega]);
        const idPedido = resultado.insertId;
        for(let detalle of pedido.detallesPedidos){
            detalle.idpedido = idPedido;
            await tablaDetalle.insertar(detalle);
        }
    }catch(error){
        console.log('Error al insertar pedido en el base de datos');
        console.log(error);
        throw error;
    }
}

async function consultar(){
    try{
       const [rows, fielde] =  await conexion.execute('SELECT *FROM vista_pedido');
       listaPedidos = [];
       for(let pedido of rows){
        const detalles = await tablaDetalle.consultarPorIdPedido(pedido.idpedido);
        pedido.detallesPedidos = detalles;
        listaPedidos.push(pedido);
       }
       return listaPedidos;
    }catch(error){
        console.log('Error al consultar pedido de la base de datos ');
        console.log(error);
        throw error;
    }
}

async function consultarPorUsuario(idusuario){
    try{
        const [rows] = await conexion.execute('SELECT * FROM vista_pedido WHERE idusuario = ?', [idusuario]);
        return rows;
    }catch(error){
        console.error('Error al consulatar pedidos por usuario', error);
        throw error;
    }
}

async function update(pedido) {
    try {
        const fechaPedido = new Date(pedido.fechaPedido);
        const fechaEntrega = new Date(pedido.fechaEntrega);
        await conexion.execute('UPDATE pedido SET idusuario = ?,  fechaPedido= ?, fechaEntrega = ? WHERE idpedido = ?', [pedido.idusuario, fechaPedido, fechaEntrega, pedido.idpedido]);
        await tablaDetalle.eliminarPorIdPedido(pedido.idpedido);
        for(let detalle of pedido.detallesPedidos){
            detalle.idpedido = pedido.idpedido;
            await tablaDetalle.insertar(detalle);
        }
    } catch (error) {
        console.log('Error al editar pedido');
        console.log(error);
        throw error;
    }
}

async function eliminar(idpedido) {
    try {
        await conexion.execute('DELETE FROM detallesPedido WHERE idpedido = ?', [idpedido]);
        await conexion.execute('DELETE FROM pedido WHERE idpedido = ? ', [idpedido]);
        
    } catch (error) {
        console.log('Error al eliminar pedido');
        console.log(error);
        throw error;
    }
}


module.exports = { insertar, consultar, update, eliminar, consultarPorUsuario };
