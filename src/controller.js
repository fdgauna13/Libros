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

async add(req, res) {
    try {
        const libro = req.body;
        if (!libro.nombre || !libro.autor || !libro.categoria || !libro.anhopublicacion || !libro.ISBN) {
            res.status(404).json({ error: 'Faltan campos requeridos' });
            return;
        }

        // Verificar si el libro ya existe
        const [existing] = await pool.query(`SELECT * FROM libros WHERE ISBN = ?`, [libro.ISBN]);
        if (existing.length > 0) {
            res.status(400).json({ error: 'El libro ya está cargado' });
            return;
        }

        const [result] = await pool.query(`INSERT INTO libros(nombre, autor, categoria, anhopublicacion, ISBN) VALUES (?, ?, ?, ?, ?)`,[libro.nombre, libro.autor, libro.categoria, libro.anio_publicacion, libro.isbn]);
        res.json({"Id insertado": result.insertId});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Hubo un error al agregar el libro' });
    }
}

    //metodo para borrar
    async delete(req, res){
        try {
            const libro = req.body;
            const [result] = await pool.query(`DELETE FROM libros WHERE ISBN=(?)`,[libro.ISBN]);
            if (result.affectedRows === 0) {
                throw new Error('No se encontró un libro con el ISBN:');
            }
            res.json({"Registros eliminados": result.affectedRows});
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Hubo un error al eliminar el libro, compruebe que el ISBN este correcto.'});
        }
    }
    //metodo para actualizar un libro de la lista
        async update(req, res){
            try {
                const libro = req.body;
                const [result] = await pool.query(`UPDATE libros SET nombre=(?), autor=(?), categoria=(?), anhopublicacion=(?), ISBN=(?) WHERE id=(?)`,[libro.nombre, libro.autor, libro.categoria, libro.anhopublicacion, libro.ISBN, libro.id]);
                console.log('Resultado de la consulta SQL: ', result);
                if (result.changedRows === 0) {
                    throw new Error('No se encontró un libro con el ID proporcionado o los datos proporcionados ya existen.');
                }
                res.json({"Registros Actualizados": result.changedRows});
            } catch (error) {
                    console.error('Error capturado: ', error.message);
                    res.status(500).json({ error: 'Hubo un error al actualizar el libro, compruebe los campos requeridos.' });
                }
        }
        
    //metodo para obtener un solo dato 
    async getOne(req, res){
        try{
            const libro = req.body;
            const id_libro= parseInt(libro.id);
            //const [result] = await pool.query(`SELECT * FROM libros WHERE id=?`, [id_libro]);
           const [result] = await pool.query(`SELECT * FROM libros WHERE id=(?)`, [id_libro]);
           res.json(result);
        } catch (error){
            console.error(error);
            res.status(404).json({ error: "No existen libros con ese ID"});
        }
      
    }
  
    }

export const libro = new libroController();
