import express from 'express';
import morgan from 'morgan';
import {router} from './routes.js';

//crear el servidor de la API REST
const app = express();
//puerto para escuchar las solicitudes
app.set('port', 3000);
//poder ver las solicitudes de los clientes
app.use(morgan('dev'));
//este metodo permite interpretar los objetos json de las solicitides de los clientes que se van inviando
app.use(express.json());
app.use(router);
//indicador del puerto- 
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get('port')}`);
})
   