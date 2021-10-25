const { check } = require('express-validator'); 
const { validateRequestSchema } = require('../helpers/validateRequestSchema');

const postValidator = [
	check('content').exists().isString(),
	check('important').optional().isBoolean(),
	(request, response, next) => {
		validateRequestSchema(request,response,next);
	}
];


module.exports = { 
	postValidator
};

