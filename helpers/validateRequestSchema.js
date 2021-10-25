const { validationResult } = require('express-validator');

const validateRequestSchema = (request, response, next) => {

	try {
		validationResult(request).throw();
		return next();
	} catch (error) {
		response.status(403);
		response.send({errors: error.array()});
	}
};

module.exports = {
	validateRequestSchema
};