import React from 'react'
import {
  TextField,
  Button,
  Box,
  Typography
} from '@mui/material'
const Forgot = () => {
  return (
    <div> <Box
      sx={{
        marginTop: 28,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography component="h1" variant="h5">
        Forgot Password
      </Typography>
      <Box component="form" noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <Button
          type="submit"
          fullWidth
          color='error'
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Submit
        </Button>
      </Box>
    </Box></div>
  )
}

export default Forgot