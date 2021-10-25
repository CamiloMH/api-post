const jwt = require('jsonwebtoken');

const validateJWT = (request,response,next) => {
	const authorization = request.get('authorization');
	let token = '';

	console.log(authorization);
	if (authorization && authorization.toLowerCase().startsWith('bearer')) {
		token = authorization.substring(7);
	}

	const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
	console.log(decodedToken);
	if (!token || !decodedToken.id) {
		return response.status(401).json({ error: 'token missing or invalid' });
	}

	const { id: userId } = decodedToken;

	request.userId = userId;

	next();
};


module.exports = {
	validateJWT
};