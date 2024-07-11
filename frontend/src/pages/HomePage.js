import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Button } from '@mui/material';
import BlogCard from '../components/BlogCard';
import { Link , useParams} from 'react-router-dom';
import { useSelector } from 'react-redux';
import DOMPurify from 'dompurify'; 

const Homepage = () => {
  const { keyword = '' } = useParams();
  console.log(keyword)
  const [blogPosts, setBlogPosts] = useState([]);
  

  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:3004/api/v1/blog/all-blogs?keyword=${keyword}`);
        const sanitizedPosts = response.data.map(post => ({
          ...post,
          content: DOMPurify.sanitize(post.content)
        }));
        setBlogPosts(sanitizedPosts);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      }
    };

    fetchBlogPosts();
  }, [keyword]);



  return (
    <div>
      <h1>Blog Posts</h1>
      
      <Grid container spacing={3}>
        {blogPosts.length > 0 ? (
          blogPosts.map(post => (
            <Grid key={post._id} item xs={12} sm={6} md={4}>
                  <Link to={`/blog/${post._id}`} style={{ textDecoration: 'none' }}>
                    <BlogCard post={post} />
                  </Link>
            </Grid>
          ))
        ) : (
          <>
           <p style={{ margin: 'auto', fontSize: '18px' }}>No blog posts available.</p>
           <Link to='/' className='btn btn-light mb-4'>
                Go Back
            </Link>
         </>
        )}
      </Grid>
      {userInfo ? (
        <Button variant="contained" color="primary" component={Link} to="/write-blog" sx={{ mb: 2 }}>
          Write Blog
        </Button>
      ) : (
        <>
        <h3>Login to write a blog</h3>
        <Button variant="contained" color="primary" component={Link} to="/login" sx={{ mb: 2 }}>
        Login
      </Button>
      </>
      )}
    </div>
  );
};

export default Homepage;
