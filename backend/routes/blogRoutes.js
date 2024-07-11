const express = require('express');
const router = express.Router();
const blogPostController = require('../controllers/blogController');



// Create a new blog post
router.post('/', blogPostController.createBlogPost);

// Read all blog posts
router.get('/all-blogs', blogPostController.getAllBlogPosts);

// Read a single blog post by ID
router.get('/:id', blogPostController.getBlogPostById);

// Update a blog post by ID
router.put('/:id', blogPostController.updateBlogPost);

// Delete a blog post by ID
router.delete('/:id', blogPostController.deleteBlogPost);

module.exports = router;
