import {pool} from './database.js';

class libroController{
//metodo que trae todo lo que hay en la base de datos - ASYNC hace que las consultas sean acincronas y va con AWAIT 
    async getAll(req, res) {
        try{
            const [result] = await pool.query(`SELECT * FROM libros`);
            //respuesta convertida en json y enviada a nuestro cliente
            res.json(result);
        }catch (error){
            console.error(error);
            res.status(500).json({ error: 'Hubo un error al obtener los libros.' });
        }
    }
    //metodo para crear/adherir nuevos libros por parte del usuario
     async add(req, res){
        try{
            const libro = req.body;
            const [result] = await pool.query(`INSERT INTO libros(nombre, autor, categoria, anhopublicacion, ISBN) VALUES (?, ?, ?, ?, ?)`, [libro.nombre, libro.autor, libro.categoria, libro.anhopublicacion, libro.ISBN]);
            if(result === indefinidet)
            res.json({"Id insertado": result.insertId});  
        }
        catch (error){
            console.error(error);
            res.status(500).json({ error: 'Hubo un error al agregar el libro, compruebe los campos requeridos' });
        }
    } 
    //metodo para borrar
    async delete(req, res){
        //en caso de que el codigo no funcione porque el parametro sea incorrecto lo solucionamos con try y catch
        try {
        const libro = req.body;
        const [result] = await pool.query(`DELETE FROM libros WHERE ISBN=(?)`, [libro.ISBN]);
        
       if (result.affectedRows == 0){
            throw new Error('No se encontro libro con el ISBN indicado');
        }
        res.json({"Registros eliminados": result.affectedRows});
         } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Hubo un error al eliminar el libro, compruebe que el isbn este correcto." });  
        }
    }
    //metodo para actualizar un libro de la lista
        async update(req, res){
            try {
                const libro = req.body;
                const [result] = await pool.query(`UPDATE libros SET nombre=(?), autor=(?), categoria=(?), anhopublicacion=(?), ISBN=(?) WHERE id=(?)`,[libro.nombre, libro.autor, libro.categoria, libro.anhopublicacion, libro.ISBN, libro.id]);
                if (result.changedRows === 0) {
                    throw new Error('No se encontró un libro con el ID proporcionado o los datos proporcionados ya existen.');
                }
                res.json({"Registros Actualizados": result.changedRows});
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Hubo un error al actualizar el libro, compruebe los campos requeridos.' });
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
