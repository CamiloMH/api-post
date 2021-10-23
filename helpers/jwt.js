const jwt = require('jsonwebtoken');



const tokenJWT = (id,name) => {

	return new Promise((resolve, reject) => {

		const payload = {
			id,
			name
		};

		jwt.sign(payload, process.env.JWT_SECRET, {
			expiresIn: '24h'
		}, (err, token) => {

			if (err) {
				console.log(err);
				reject(err);
			} else {
				resolve(token);
			}
		});
	});


};


module.exports = {
	tokenJWT,
};