require('dotenv').config();
const express = require('express');
const cors = require('cors');
//Creamos el servidor express
const app = express();

//Configurar cors
app.use(cors());

//Corremos el servidor en el puerto 3000

app.listen(process.env.PORT, () => {
	console.log(`Server running on port ${process.env.PORT}`);
}); 