const  bcrypt  = require('bcrypt');
const User = require('../models/User');
const {tokenJWT} = require('../helpers/jwt');

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
		response.status(204).json({
			msg: 'the user not found'
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
			return response.sendStatus(226);
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
		
		/* Generar Token */
		const token = await tokenJWT(user.id, user.name);
		/* Guardamos el usuario */
		await user.save();


		response.status(201).json({
			user,
			token
		});
        
        
	} catch (error) {
		response.status(400).json(error);
	}
};

//Borrar usuario
const removeUser = async(request,response) =>{
	const { id } = request.params;
	try {
		const res = await User.findByIdAndDelete(id);
		if(res === null) return response.status(404).json({error: 'id used is malformed'});
		response.status(204).json({
			msg : 'Deleted user'
		});

	} catch (error) {
		response.status(400).json(error);
	}

};

const updateUser = async(request,response) =>{
	const { id } = request.params;

	try {
		const userDB = await User.findById(id);
		if(!userDB) return response.status(404).json({error: 'id used is malformed'});

		const {name, lastName , mail , password} = request.body;

		if(userDB.mail !== mail){
			const existsMail = await User.findOne({mail});
			if(existsMail) return response.sendStatus(226);
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
		response.status(404).json(error);

	}
};

module.exports = {
	getUsers,
	createUser,
	removeUser,
	updateUser,
	getUser,
};