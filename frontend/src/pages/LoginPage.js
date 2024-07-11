import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setUser } from '../slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import DOMPurify from 'dompurify';





const defaultTheme = createTheme();


const LoginPage = () => {
    const [email1, setEmail] = useState('');
    const [password1, setPassword] = useState('');
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.user);
    const navigate = useNavigate();

   
    const handleSubmit = async (event) => {

        const email = DOMPurify.sanitize(email1);
        const password = DOMPurify.sanitize(password1);
        event.preventDefault();
        try {
          const response = await axios.post('http://localhost:3004/api/v1/users/login', {
            email,
            password,
          });
         
          if(response.data){
            toast.success('Login successful!');
            dispatch(setUser(response.data));
            navigate('/home')
           
          }

        } catch (err) {
          console.log('There was an error logging in!', err);
          toast.error(err.response.data.error);
        }
      };
      const { search } = useLocation();
      const sp = new URLSearchParams(search);
      const redirect = sp.get('redirect') || '/home';
  
      useEffect(() => {
          if (userInfo){
              navigate(redirect);
          }
      },[ userInfo,redirect, navigate])




    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email1}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password1}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                    </Box>
               
                <Grid container>
                            <Grid item>
                                <Link href="/register" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                </Box>
               
            </Container>
        </ThemeProvider>
    );
};

export default LoginPage;
