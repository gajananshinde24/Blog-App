import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Typography, Button, Card, CardContent, CircularProgress, Box } from '@mui/material';
import DOMPurify from 'dompurify';

const BlogDetailsPage = () => {
  const { id } = useParams();
  const id1 = DOMPurify.sanitize(id);
  const [blogPost, setBlogPost] = useState(null);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const response = await axios.get(`http://localhost:3004/api/v1/blog/${id1}`);
        const sanitizedContent = DOMPurify.sanitize(response.data.content);
        console.log(sanitizedContent)
        setBlogPost({ ...response.data, content: sanitizedContent });
      } catch (error) {
        console.error(`Error fetching blog post with ID ${id}:`, error);
      }
    };

    fetchBlogPost();
  }, [id]);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      {blogPost ? (
        <Card>
          <CardContent>
            <Typography variant="h4" component="h1" gutterBottom>
              {blogPost.title}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" gutterBottom>
              Author: {}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              Created at: {new Date(blogPost.createdAt).toLocaleString()}
            </Typography>
            <Typography variant="body1" paragraph>
              {blogPost.content}
            </Typography>
            {/* Add more details as needed */}
            <Button variant="contained" color="primary" onClick={() => window.history.back()}>
              Back to Homepage
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
        </Box>
      )}
    </Container>
  );
};

export default BlogDetailsPage;
