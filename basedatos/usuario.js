const conexion = require ('./conexion');

async function getUsuarioPorCi(ci, password){
    try {
        const [resultado] = await conexion.query('SELECT * FROM usuario WHERE ci = ? AND password = sha2(?, 256)', [ci, password]);
        return resultado;
    }catch(e){
        console.error('Error al consultar usuario por ci y password', e);
        throw e;
    }   
    }

async function insertar(usuario){
    try{
        await conexion.execute('INSERT INTO usuario(idusuario, nombre, apellido, direccion, telefono, ci, digitoRuc , correo, password, idtipo) VALUE(?,?,?,?,?,?,?,?, sha2(?, 256), ?)',[usuario.idusuario, usuario.nombre, usuario.apellido, usuario.direccion, usuario.ci, usuario.digitoRuc, usuario.correo, usuario.password, usuario.idtipo ]);

    }catch(error){
        console.log('Error al insertar usuario en el base de datos');
        console.log(error);
        throw error;
    }
}

async function consultar(){
    try{
       const [rows, fielde] =  await conexion.execute('SELECT *FROM vista_usuario');
       return rows;
    }catch(error){
        console.log('Error al consultar usuario de la base de datos ');
        console.log(error);
        throw error;
    }
}

async function update(usuario) {
    try {
        await conexion.execute('UPDATE producto SET  nombre = ?, apellido = ?, direccion = ?, telefono  = ?, ci = ?, digitoRuc =?,  correo = ?, password = ?, idtipo = ?, WHERE idusuario = ?', [usuario.nombre, usuario.apellido, usuario.direccion, usuario.ci, usuario.digitoRuc, usuario.correo, usuario.password,usuario.idtipo , usuario.idusuario]);
    } catch (error) {
        console.log('Error al editar usuario');
        console.log(error);
        throw error;
    }
}

async function eliminar(idusuario) {
    try {
        await conexion.execute('DELETE FROM usuario WHERE idusuario = ? ', [idusuario]);
    } catch (error) {
        console.log('Error al eliminar usuario');
        console.log(error);
        throw error;
    }
}


module.exports = { insertar, consultar, update, eliminar, getUsuarioPorCi };
