const express = require('express');

//Creamos el servidor express
const app = express();



//Corremos el servidor en el puerto 3000
const PORT = 3000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
}); 