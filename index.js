require('dotenv').config();
const express = require('express');
const cors = require('cors');

const {
	dbConnection
} = require('./database/config');


//Creamos el servidor express
const app = express();

//Configurar cors
app.use(cors());
//Lectura y parseo del Body
app.use(express.json());

//Iniciamos base de datos
dbConnection();


//Rutas
app.use('/api/v1/users', require('./routes/users'));
// app.use('/api/v1/posts', require('./routes/posts'));

//Auth
app.use('/api/v1/auth', require('./routes/auth'));


//Corremos el servidor en el puerto 3000

app.listen(process.env.PORT, () => {
	console.log(`Server running on port ${process.env.PORT}`);
}); 