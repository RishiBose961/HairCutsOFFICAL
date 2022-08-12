import React, { useContext, useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button, Divider } from '@mui/material';
import Time from './Time';
import { Box, FormControl, InputLabel, Select, TextField, MenuItem, Rating } from '@mui/material'

const Details = () => {
  const { token } = useContext(AuthContext)








  const { id } = useParams("");
  console.log(id);
  const [getuserdata, setgetuserdata] = useState([])


  const getdata = async (e) => {

    const res = await fetch(`/api/auth/getallshopid/${id}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        'Authorization': token
      },
    })

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("error");
    } else {
      setgetuserdata(data);
      console.log("get data");
    }
  }

  useEffect(() => {
    getdata();
  }, [])
  

  const refreshPage = () => {
    window.location.reload();
  }

  //Form

  const [inpval, setinpval] = useState({
    nohaircut: '',
    rating: '',
    date: '',
    shopname: ''

  })

  const setdata = (e) => {
    const { name, value } = e.target;
    setinpval((preval) => {
      return {
        ...preval,
        [name]: value
      }
    })
  }


  const addinpdata = async (e) => {
    e.preventDefault();

    const { shopname, nohaircut, rating, date } = inpval

    const res = await fetch("/api/auth/createhair", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        'Authorization': token
      },
      body: JSON.stringify({
        shopname, nohaircut, rating, date
      })
    })

    const data = await res.json();
    console.log(data);


    if (!shopname || !nohaircut || !rating || !date) {
      alert('Please fill')
      if (res.status === 422 || !data) {
        alert("error");
        console.log("error");

      }
    }

    else {
      alert("data added");
    }
  }

  return (
    <>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar sx={{
          backgroundImage: 'linear-gradient(to left, #ec8a3f, #cba534, #a3ba4b, #74ca76, #2dd6aa);',
        }}>
          <Typography variant="h6" color="inherit" noWrap>
            <Button onClick={refreshPage} >
              <Link to="/" style={{ textDecoration: 'none', color: 'black', fontSize: '23px' }}> 🔙 Hair Cuts </Link>
            </Button>
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Shop {getuserdata.shopname}
          </Typography>
          <Divider sx={{ mb: 4 }} />
          <Box sx={{ mt: 3 }}>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <InputLabel id="demo-simple-select-label">Shop Name</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Shop Name"
                name='shopname'
                value={inpval.shopname}
                onChange={setdata}
              >
                <MenuItem value={getuserdata.shopname}>{getuserdata.shopname}</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Number of Hair Cuts</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Number of Hair Cuts"
                name='nohaircut'
                value={inpval.nohaircut}
                onChange={setdata}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
              </Select>
            </FormControl>
            <Typography sx={{ mt: 3 }}>Rating</Typography>
            <Rating sx={{ mt: 1 }}
              defaultValue={1}
              size="large"
              name='rating'
              value={inpval.rating}
              onChange={setdata}
            />
            <br />
            <TextField
              id="datetime-local"
              label="Next appointment"
              defaultValue={Date.now()}
              type="datetime-local"
              name='date'
              onChange={setdata}
              value={inpval.date}
              sx={{ width: 250, mt: 4 }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>

          <Button sx={{ mt: 4, mb: 4 }} variant="contained" color='success' onClick={addinpdata} align="center">Appointment</Button>


          <Divider sx={{ mt: 4, mb: 4 }} />
          <Typography component="h5" variant="h6">Shop Name : <span>{getuserdata.shopname}</span></Typography>
          <Divider sx={{ mb: 4 }} />
          <Typography component="h5" variant="h6">Owner : <span>{getuserdata.owner}</span></Typography>
          <Divider sx={{ mb: 4 }} />
          <Typography component="h3" variant="h6">Phone/Mobile : <span>91+ {getuserdata.phone}</span></Typography>
          <Divider sx={{ mb: 4 }} />
          <Typography component="h3" variant="h6">PinCode : <span>{getuserdata.pin}</span></Typography>
          <Divider sx={{ mb: 4 }} />
          <Typography component="h3" variant="h6">State : <span>{getuserdata.state}</span></Typography>
          <Divider sx={{ mb: 4 }} />
          <Typography component="h3" variant="h6">Address : <span>{getuserdata.address}</span></Typography>
          <Divider sx={{ mb: 4 }} />
          <Typography sx={{ mb: 4 }} component="h3" variant="h6">Time</Typography>
          <Time />
        </Paper>
      </Container>
    </>
  )
}

export default Details