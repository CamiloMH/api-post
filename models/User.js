const {Schema, model } = require('mongoose');

const userSchema = Schema({
	name:{
		type: String,
		require:true
	},
	lastName:{
		type: String,
		require: true
	},
	mail:{
		type: String,
		require: true,
		unique: true,
	},
	password:{
		type: String,
		require: true,
	},

});

userSchema.set('toJSON',{
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id;
		delete returnedObject._id;
		delete returnedObject.__v;
	}
});

module.exports = model('User', userSchema);