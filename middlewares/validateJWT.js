const jwt = require('jsonwebtoken');

const validateJWT = (request,response,next) => {
	const authorization = request.get('authorization');
	if(!authorization) return response.status(401).json({error: 'Null token'});
	let token = '';

	try {
		
	
		if (authorization && authorization.toLowerCase().startsWith('bearer')) {
			token = authorization.substring(7);
		}
	
		const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
		if (!token || !decodedToken.id) {
			return response.status(401).json({ error: 'token missing or invalid' });
		}
	
		const { id: userId } = decodedToken;
	
		request.userId = userId;
	
		next();
	} catch (error) {
		return response.status(401).json({
			error: 'Invalid token'
		});
	}
};


module.exports = {
	validateJWT
};