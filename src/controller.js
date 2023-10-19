import {pool} from './database.js';

class libroController{
//metodo que trae todo lo que hay en la base de datos - ASYNC hace que las consultas sean acincronas y va con AWAIT 
    async getAll(req, res) {
        const [result] = await pool.query('SELECT * FROM libros');
        //respuesta convertida en json y enviada a nuestro cliente
        res.json(result);
    }
    //metodo para crear/adherir nuevos libros por parte del usuario
    async add(req, res){
        const libro = req.body;
        const [result] = await pool.query('INSERT INTO libros(nombre, autor, categoria, añopublicacion, ISBN) VALUES (?, ?, ?, ?, ?)', [libro.nombre, libro.autor, libro.categoria, libro.añopublicacion, libro.ISBN]);
        res.json({"Id insertado": result.insertId});
    }
    //metodo para borrar
    async delete(req, res){
        const libro = req.body;
        const [result] = await pool.query('DELETE FROM libros WHERE id=(?)', [libro.id]);
        res.json({"Registros eliminados": result.affectedRows});
    }
    //metodo para actualizar la lista
    async update(req, res){
        const libro = req.body;
        const [result] = await pool.query('UPDATE libros SET nombre=(?), autor=(?), categoria=(?), añopublicacion=(?), ISBN=(?) WHERE id=(?)', [libro.nombre, libro.autor, libro.categoria, libro.añopublicacion, libro.ISNB, libro.id]);
        res.json({"Registros actualizados": result.changedRows});
    }
    //metodo para obtener un solo dato 
    async getOne(req, res){
        const libro = req.body;
        const id_libro= parseInt(libro.id);
        //const [result] = await pool.query('SELECT * FROM libros WHERE id=?', [id_libro]);
       const [result] = await pool.query(`SELECT * FROM libros WHERE id=(?)`, [id_libro]);
       res.json(result);
}
}
export const libro = new libroController();
