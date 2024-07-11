const BlogPost = require('../models/blogPost');

// Create a new blog post
const createBlogPost = async (req, res) => {
  try {
    const { author, title, content, tags } = req.body;
    const newBlogPost = new BlogPost({ author, title, content, tags });
    await newBlogPost.save();
    res.status(201).json(newBlogPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllBlogPosts = async (req, res) => {
  try{
 
    const  keyword = req.query.keyword || '';  
 

    const regexQuery = new RegExp(keyword, 'i'); 

    const query = {
      $or: [
        { content: regexQuery }, 
        { title: regexQuery }, 
        { tags: regexQuery } 
      ]
    };
    
    const blogPosts = await BlogPost.find({...query});
    res.status(200).json(blogPosts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get a blog post by ID
const getBlogPostById = async (req, res) => {
  try {
    const blogPost = await BlogPost.findById(req.params.id);


   
    if (!blogPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.status(200).json(blogPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a blog post by ID
const updateBlogPost = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const blogPost = await BlogPost.findByIdAndUpdate(
      req.params.id,
      { title, content, tags, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    if (!blogPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.status(200).json(blogPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a blog post by ID
const deleteBlogPost = async (req, res) => {
  try {
    const blogPost = await BlogPost.findByIdAndDelete(req.params.id);
    if (!blogPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.status(200).json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBlogPost,
  getAllBlogPosts,
  getBlogPostById,
  updateBlogPost,
  deleteBlogPost
};
