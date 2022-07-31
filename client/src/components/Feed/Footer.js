import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {'Copyright © '}
      <Link color="inherit" href="/">
        Hair Cuts
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Footer() {
  return (

    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 8,
        backgroundImage: 'linear-gradient(to left, #ec8a3f, #cba534, #a3ba4b, #74ca76, #2dd6aa);'
      }}
    >
      <Container maxWidth="sm">
        <center>
          <Typography variant="body1">
          🤩 Hope You Enjoy 🎃
          </Typography>
          <Copyright />
        </center>
      </Container>
    </Box>
  );
}