import React, { useState, useEffect, useContext } from 'react'
import { Container, Grid, Card, CardMedia, CardContent, Typography, Box, Button } from '@mui/material'
import { AuthContext } from '../../context/AuthContext';
import { Link, NavLink, Redirect } from 'react-router-dom';




const Feed = () => {


  const { token } = useContext(AuthContext)
  const [mypic, setPic] = useState([])


  useEffect(() => {
    fetch('/api/auth/getallshop', {
      headers: {
        'Authorization': token
      }
    }).then(res => res.json())
      .then(result => {
        setPic(result.allshop)
        console.log(result.allshop);
      })
  }, [])

  const refreshPage = () => {
    window.location.reload();
  }


  return (
    <>
      <Container maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={4}>
          {mypic.map((card) => (
            <Grid item xs={12} sm={6} md={4}>
              <Card
                sx={{ height: '70%', display: 'flex', flexDirection: 'column' }}
              >
                <CardMedia
                  component="img"
                  sx={{ height: "50%" }}
                  image="https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8aGFpciUyMHNhbG9ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500"
                  alt="random"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <u>Shop Name</u>
                  <Typography sx={{mt:1}} gutterBottom variant="h5" component="h2">
                    <b>{card.shopname}</b>
                  </Typography>
                  <Typography>
                    {card.email}
                  </Typography>
                </CardContent>
              </Card>
              <Box sx={{mt:3}}>
              <Link to={`/${card._id}`} style={{textDecoration: 'none',color:'white',fontSize:'16px'}}>
                <Button fullWidth variant='contained' color="warning" size="small">
                   ⬆ View
                </Button>
                </Link>
              </Box>

            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  )
}

export default Feed