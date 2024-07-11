import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const BlogCard = ({ post, onClick }) => {
  return (
    <Card onClick={onClick} style={{ cursor: 'pointer', marginBottom: 20 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {post.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Author: {}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          Created at: {new Date(post.createdAt).toLocaleString()}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
