const User = require('../models/User');
const bcrypt = require('bcrypt');
const { tokenJWT } = require('../helpers/jwt');

const login = async(request,response) => {
	const { mail , password } = request.body;

	try {
        
		const user = await User.findOne({ mail });
		if (!user) {
			return response.status(404).json({
				error: 'invalid user or password'
			});
		}
		/* Verificar contraseña */
		const validPassword = bcrypt.compareSync(password, user.password);
		if (!validPassword) {
			return response.status(400).json({
				error: 'invalid user or password'

			});
		}
		
		const token = await tokenJWT(user.id, user.name);

		response.json({
			name: user.name,
			mail: user.mail,
			token
		});


	} catch (error) {
		response.sendStatus(404);
	}

};

module.exports = {
	login
};