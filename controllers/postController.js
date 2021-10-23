const Post = require('../models/Post');
const User = require('../models/User');

/* Obtener todos los post */
const getPosts = async(request,response) => {
	const posts = await Post.find({});
	response.json(posts);
};

/* Obtener un post */
const getPostById = async(request,response) => {
	const { id } = request.params;
	try {
		const postDB = await Post.findById(id);
		if(postDB === null) return response.sendStatus(400);

		response.json({
			ok:true,
			post: postDB
		});
	} catch (error) {
		response.status(400).json();
	}
};

/* Crear un post */
const createPost = async(request,response) =>{
	const { content, important = false} = request.body;
    
	/* obtener el id del user */
	console.log(request);

	// const user = await User.findById(userId);
	// if(!content) return response.status(400).json({error:'required "content" field is missing'});
    
	// const newPost = new Post({
	// 	content,
	// 	date: new Date(),
	// 	important,
	// 	user: user._id
	// });

	// try {
	// 	const savedPost = await newPost.save();

	// 	response.json(savedPost);
        

	// } catch (error) {
	// 	response.sendStatus(400);
	// }

};

module.exports = {
	getPosts,
	getPostById,
	createPost,
};
