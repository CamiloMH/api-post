const { Schema, model } = require('mongoose');

const postSchema = Schema({
	content:{
		type:String,
		require: true
	},
	date:{
		type:Date,
		require:true
	},
	important:{
		type:Boolean,
	},
	user:{
		type: Schema.Types.ObjectId,
		ref: 'User'
	}
    
});

postSchema.set('toJSON',{
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id;
		delete returnedObject._id;
		delete returnedObject.__v;
	}
});

module.exports = model('Post', postSchema);