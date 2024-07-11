import * as React from 'react';
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
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';

const defaultTheme = createTheme();

const RegisterPage = () => {


  const [email1, setEmail] = useState('');
  const [password1, setPassword] = useState('');
  const [username1, setUsername] = useState('');
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [touched, setTouched] = useState({
    username: false,
    email: false,
    password: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    validateInputs();
  }, [email1, password1, username1]);

  const validateInputs = () => {
    const errors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email1)) {
      errors.email = 'Please enter a valid email address';
    }

    const usernameRegex = /^[a-zA-Z0-9]{3,}$/;
    if (!usernameRegex.test(username1)) {
      errors.username = 'Username should be at least 3 characters long and contain only letters and numbers';
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password1)) {
      errors.password = 'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character';
    }

    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  const handleBlur = (field) => () => {
    setTouched({
      ...touched,
      [field]: true,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = DOMPurify.sanitize(email1);
    const username = DOMPurify.sanitize(username1);
    const password = DOMPurify.sanitize(password1);

    try {
      const response = await axios.post('http://localhost:3004/api/v1/users/register', {
        email,
        password,
        username,
      });

      if (response.data) {
        toast.success('Registered Successfully!');
        navigate('/login');
      }
    } catch (err) {
      console.log('There was an error in register', err);
      toast.error(err.response.data.error);
    }
  };

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
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  value={username1}
                  onChange={(e) => setUsername(e.target.value)}
                  onBlur={handleBlur('username')}
                  error={touched.username && !!errors.username}
                  helperText={touched.username && errors.username}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email1}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={handleBlur('email')}
                  error={touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password1}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={handleBlur('password')}
                  error={touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!isFormValid}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default RegisterPage;
