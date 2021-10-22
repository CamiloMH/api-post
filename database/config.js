const mongoose = require('mongoose');


const dbConnection = async() => {

	try {
		await mongoose.connect(process.env.DB_CONN);
		console.log('DB connected');

	} catch (error) {
		throw new Error('Error al iniciar la base de datos');
	}



};

module.exports = {
	dbConnection
};