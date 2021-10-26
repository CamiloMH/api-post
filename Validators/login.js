const { check } = require('express-validator'); 
const { validateRequestSchema } = require('../helpers/validateRequestSchema');

const loginValidator = [
	check('mail').exists().isEmail().toLowerCase(),
	check('password').isLength({min:4}),
	(request, response, next) => {
		validateRequestSchema(request,response,next);
	}
];


module.exports = { 
	loginValidator
};