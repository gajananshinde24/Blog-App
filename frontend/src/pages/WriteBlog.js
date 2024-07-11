import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Chip } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DOMPurify from 'dompurify'; 


const WriteBlog = () => {
  const [title1, setTitle] = useState('');
  const [content1, setContent] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.user);

  const handleAddTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput('');
    }
  };

  const handleDeleteTag = (tagToDelete) => {
    setTags(tags.filter(tag => tag !== tagToDelete));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(content1)

    const title = DOMPurify.sanitize(title1);
    const content = DOMPurify.sanitize(content1);

    console.log(title)

    try {
      const author = userInfo._id; // Replace with the actual user ID
      await axios.post('http://localhost:3004/api/v1/blog', {
        author,
        title,
        content,
        tags,
      });
      navigate('/home'); 
    } catch (error) {
      console.error('Error creating blog post:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Create a New Blog Post
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          required
          value={title1}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Content"
          variant="outlined"
          fullWidth
          required
          multiline
          rows={4}
          value={content1}
          onChange={(e) => setContent(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <TextField
            label="Tags"
            variant="outlined"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            sx={{ mr: 2 }}
          />
          <Button variant="contained" onClick={handleAddTag}>
            Add Tag
          </Button>
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: 2 }}>
          {tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              onDelete={() => handleDeleteTag(tag)}
              sx={{ mr: 1, mb: 1 }}
            />
          ))}
        </Box>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default WriteBlog;
