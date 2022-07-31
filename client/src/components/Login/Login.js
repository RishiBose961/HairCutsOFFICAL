import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom'
import { useState, useContext } from "react"
import axios from "axios";
import { isEmpty, isEmail } from '../helper/Validate'
import { AuthContext } from "../../context/AuthContext";


const initialState = {
  name: '',
  password: '',
}

const SignIn = () => {

  const [data, setData] = useState(initialState);
  const { email, phone, password } = data;
  const { dispatch } = useContext(AuthContext)

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const login = async (e) => {
    e.preventDefault()
    // check field
    if (isEmpty(email) || isEmpty(password))
      return alert("Please enter your email Address")
    // check email
    if (!isEmail(email))
      return alert("Please enter a validate Email")

    try {
      await axios.post('/api/auth/signing', {email, password })
      localStorage.setItem('_appSignging', true)
      dispatch({ type: 'SIGNING' })
    } catch (error) {
      alert(error.response.data.message)
    }
  }

  const refreshPage = () => {
    window.location.reload();
  }

  return (
    <Box
      sx={{
        marginTop: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}

    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box component="form" onSubmit={login} noValidate sx={{ mt: 1 }}>
        <TextField
              margin="normal"
              required
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
            />
        <TextField
          margin="normal"
          fullWidth
          name="password"
          label="Password"
          type="password"
          onChange={handleChange}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs justifyContent="right" >
            <Button onClick={refreshPage}>
              <Link to='/forgot'>
                Forgot password?
              </Link>
            </Button>
          </Grid>
          <Grid item>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default SignIn;