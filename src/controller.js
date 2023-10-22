import {pool} from './database.js';

class libroController{
//metodo que trae todo lo que hay en la base de datos - ASYNC hace que las consultas sean acincronas y va con AWAIT 
    async getAll(req, res) {
        const [result] = await pool.query(`SELECT * FROM libros`);
        //respuesta convertida en json y enviada a nuestro cliente
        res.json(result);
    }
    //metodo para crear/adherir nuevos libros por parte del usuario
    async add(req, res){
        const libro = req.body;
        const [result] = await pool.query(`INSERT INTO libros(nombre, autor, categoria, añopublicacion, ISBN) VALUES (?, ?, ?, ?, ?)`, [libro.nombre, libro.autor, libro.categoria, libro.añopublicacion, libro.ISBN]);
        res.json({"Id insertado": result.insertId});
    }
    //metodo para borrar
    async delete(req, res){
        //en caso de que el codigo no funcione porque el parametro sea incorrecto lo solucionamos con try y catch
        try {
        const libro = req.body;
        const [result] = await pool.query(`DELETE FROM libros WHERE ISBN=(?)`, [libro.ISBN]);
        
       // if (result.affectedRows == 0){
            //throw new Error('No se encontro libro con el ISBN indicado');
        //}
        res.json({"Registros eliminados": result.affectedRows});
         } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Hubo un error al eliminar el libro, compruebe que el isbn este correcto.' });  
        }
    }
    //metodo para actualizar la lista
    async update(req, res){
        try{
            const libro = req.body;
            const [result] = await pool.query(`UPDATE libros SET nombre=(?), autor=(?), categoria=(?), añopublicacion=(?), ISBN=(?) WHERE id=(?)`, [libro.nombre, libro.autor, libro.categoria, libro.añopublicacion, libro.ISBN, libro.id]);
            res.json({"Registros actualizados": result.changedRows});
        }catch (e){
            console.log(e);
        }
       
    }
    //metodo para obtener un solo dato 
    async getOne(req, res){
        try{
            const libro = req.body;
            const id_libro= parseInt(libro.id);
            //const [result] = await pool.query('SELECT * FROM libros WHERE id=?', [id_libro]);
           const [result] = await pool.query(`SELECT * FROM libros WHERE id=(?)`, [id_libro]);
           res.json(result);
        } catch (e){
            console.log("No existen libros con ese ID");
        }
      
    }
  
    }
   


export const libro = new libroController();
