import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { isEmpty, isEmail, isLength, isMatch } from '../helper/Validate'
import axios from "axios";


const initialState = {
  firstname: '',
  lastname: '',
  phone:'',
  email: '',
  password: '',
  cf_password: ''
}

export default function SignUp() {
  const [data, setData] = useState(initialState)
  const { firstname,lastname, email,phone, password, cf_password } = data


  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const register = async (e) => {
    e.preventDefault()
    //check field
    if (isEmpty(firstname) || isEmpty(password))
      return alert("Please Fill in all fields")
    //check email
    if (!isEmail(email))
      return alert("Please Enter a Valid Email Address")
    //check password
    if (isLength(password))
      return alert("Password Must be a at least 6 character")
    //check match
    if (!isMatch(password, cf_password))
      return alert("Password did not match")
    try {
      const res = await axios.post("/api/auth/register", {
        firstname,lastname, email,phone, password, cf_password
      })
      alert(res.data.message)

    } catch (error) {
      alert(error.response.data.message)
    }
    handleReset();
  }


  const handleReset = () => {
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    )
    setData({ ...data, firstname: "",lastname:"",phone: "",email: "", password: "", cf_password: "" })
  }
  return (
    <Box
      sx={{
        marginTop: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >

      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <Box component="form" noValidate onSubmit={register} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="given-name"
              name="firstname"
              required
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastname"
              autoComplete="family-name"
              onChange={handleChange}
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
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="phone"
              label="Phone Number"
              name="phone"
              onChange={handleChange}
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
              onChange={handleChange}
            />
            <TextField
              sx={{ mt: 3 }}
              required
              fullWidth
              name="cf_password"
              label="Confirm Password"
              type="password"
              id="password"
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </Button>
      </Box>
    </Box>

  );
}