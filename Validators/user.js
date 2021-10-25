const { check } = require('express-validator'); 
const { validateRequestSchema } = require('../helpers/validateRequestSchema');

const userValidator = [
	check('name').exists().isString(),
	check('lastName').exists().isString(),
	check('mail').exists().isEmail().toLowerCase(),
	check('password').isLength({min:4}),
	(request, response, next) => {
		validateRequestSchema(request,response,next);
	}
];


module.exports = { 
	userValidator
};