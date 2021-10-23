const  bcrypt  = require('bcrypt');
const User = require('../models/User');

/* Obtener todos los usuarios */
const getUsers = async(request,response) =>{
	const users = await User.find({});
	response.json(users);
	
};

//Obtener un usuario
const getUser = async(request,response) =>{
	const { id } = request.params;
	try {
		const userDB = await User.findById(id);
		if(userDB === null) return response.sendStatus(404);

		response.json({
			ok:true,
			user: userDB
		});

	} catch (error) {
		console.log(error);
		response.status(204).json({
			ok: false,
			msg: 'El usuario no existe'
		});
	}
};

//Creamos un usuario
const createUser = async(request,response) => {


	try {
		const { name, lastName, mail, password } = request.body;

		/* Verificamos que el mail no este ya registrado */
		const existsMail = await User.findOne({ mail});
		if(existsMail){
			return response.status(400).json({
				ok: false,
				msg: 'El email ya existe'
			});
		} 
		/* Encriptamos la contraseña */
		const saltRounds = 10;
		const passwordHash = bcrypt.hashSync(password, saltRounds);

		const user = new User({
			name,
			lastName,
			mail,
			password : passwordHash
		});

		/* Guardamos el usuario */
		await user.save();

		response.status(201).json({
			ok: true,
			user
		});
        
        
	} catch (error) {
		console.log(error);
		response.status(500).json({
			ok: false,
			msg: 'Error inesperado'
		});
	}
};

//Borrar usuario
const removeUser = async(request,response) =>{
	const { id } = request.params;
	try {
		const res = await User.findByIdAndDelete(id);
		if(res === null) return response.sendStatus(404);
		response.status(204).end();

	} catch (error) {
		console.log(error);
		response.status(404).json({
			ok: false,
			msg: 'Error inesperado'
		});
	}

};

const updateUser = async(request,response) =>{
	const { id } = request.params;

	try {
		const userDB = await User.findById(id);
		if(!userDB) return response.status(404).json({ok:false,msg:'id invalido'});

		const {name, lastName , mail , password} = request.body;

		if(userDB.mail !== mail){
			const existsMail = await User.findOne({mail});
			if(existsMail) return response.status(404).json({ok:false,msg:'Ese email ya esta en uso'});
		}	

		/* Encriptamos la contraseña */
		const saltRounds = 10;
		const passwordHash = bcrypt.hashSync(password, saltRounds);

		const newUserInfo = {
			name,
			lastName,
			mail,
			password : passwordHash
		};

		const userUpdate = await User.findOneAndUpdate(id,newUserInfo,{new:true});

		response.json({
			ok:true,
			user: userUpdate
		});
		
	} catch (error) {
		console.log(error);
		response.status(404).json({
			ok: false,
			msg: 'Error inesperado'
		});
	}
};

module.exports = {
	getUsers,
	createUser,
	removeUser,
	updateUser,
	getUser,
};