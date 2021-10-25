const Post = require('../models/Post');
const User = require('../models/User');

/* Obtener todos los post */
const getPosts = async(request,response) => {
	const posts = await Post.find({}).populate('user',{
		name:1,
		lastName:1
	});
	response.json(posts);
};

/* Obtener un post */
const getPostById = async(request,response) => {
	try {
		const { id } = request.params;
		const postDB = await Post.findById(id).populate('user',{
			name:1,
			lastName:1
		});
		if(postDB === null) return response.sendStatus(400);

		response.json({
			post: postDB
		});
	} catch (error) {
		response.sendStatus(error);

	}
};

/* Crear un post */
const createPost = async(request,response) =>{
	const { content, important = false} = request.body;
    
	/* obtener el id del user */
	const { userId } = request;
	try {

		const user = await User.findById(userId);
		if(!content) return response.status(400).json({error:'required "content" field is missing'});
    
		const newPost = new Post({
			content,
			date: new Date(),
			important,
			user: user._id
		});

		const savedPost = await newPost.save();

		response.json(savedPost);
        

	} catch (error) {
		response.sendStatus(error.name);

	}

};

//Borrar un post
const deletePost = async(request,response) => {
	try {
		const { id } = request.params;
		const res = await Post.findByIdAndDelete(id);
		if( res === null) return response.sendStatus(404);
	
		response.status(204).end();
		
	} catch (error) {
		response.sendStatus(error.name);
		
	}
};

//Actualizar un post
const updatePost = async (request,response) => {
	try {
		const { id } = request.params;
		const post = await Post.findById(id);
		if(!post) return response.status(404).json({
			error: 'Id not found'
		});
		
		const postInfo = request.body;

		const newPost = {
			content: postInfo.content,
			important: postInfo.important,
		};

		const newPostInfo = await Post.findByIdAndUpdate(id, newPost,{new:true});

		response.json({
			post: newPostInfo
		});

		
	} catch (error) {
		response.sendStatus(error.name);

	}

};

module.exports = {
	getPosts,
	getPostById,
	createPost,
	deletePost,
	updatePost
};
