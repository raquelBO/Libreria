
const conexion = require ('./conexion');

async function insertar(productos){
    try{
        await conexion.execute('INSERT INTO producto (idproducto, nombrePro, precioPro, cantidadPro, produOferta, marcaPro) VALUE(?,?,?,?,?,?)',[productos.idproducto, productos.nombrePro, productos.precioPro, productos.cantidadPro, productos.produOferta, productos.marcaPro]);
    }catch(error){
        console.log('Error al insertar productos en el base de datos');
        console.log(error);
        throw error;
    }
}

async function consultar(){
    try{
       const [rows, fielde] =  await conexion.execute('SELECT *FROM vista_producto');
       return rows;
    }catch(error){
        console.log('Error al consultar productos de la base de datos ');
        console.log(error);
        throw error;
    }
}

async function update(productos) {
    try {
        await conexion.execute('UPDATE producto SET  nombrePro = ?, precioPro = ?, cantidadPro  = ?, produOferta  = ?, marcaPro = ? WHERE idproducto = ?', [productos.idproducto, productos.nombrePro, productos.precioPro, productos.cantidadPro, productos.produOferta, productos.marcaPro]);
    } catch (error) {
        console.log('Error al editar productos');
        console.log(error);
        throw error;
    }
}

async function eliminar(idproducto) {
    try {
        await conexion.execute('DELETE FROM productos WHERE idproducto = ? ', [idproducto]);
    } catch (error) {
        console.log('Error al eliminar productos');
        console.log(error);
        throw error;
    }
}


module.exports = { insertar, consultar, update, eliminar };

