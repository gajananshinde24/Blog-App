import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';


const SearchBox = () => {
  const navigate = useNavigate();
  const [keyword1, setKeyword] = useState('');

  const submitHandler = (e) => {

    const keyword = DOMPurify.sanitize(keyword1);

  
    e.preventDefault();
    if (keyword.trim()) {
        navigate(`/search/${keyword.trim()}`);
      setKeyword('');
    } else {
      navigate('/');
    }
  };

  return (
    <form onSubmit={submitHandler} className="d-flex">
      <TextField
        variant="outlined"
        placeholder="Search..."
        size="small"
        value={keyword1}
        onChange={(e) => setKeyword(e.target.value)}
        sx={{ backgroundColor: 'white', borderRadius: 1, marginRight: 1 }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        startIcon={<SearchIcon />}
        sx={{ height: '100%' }}
      >
        Search
      </Button>
    </form>
  );
};

export default SearchBox;