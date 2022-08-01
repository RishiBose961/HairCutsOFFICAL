import React, { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'
import { Box } from '@mui/system'
import { Typography, Paper, Button, Divider } from '@mui/material'
const Activatelayout = () => {
  const history = useHistory()

  const { activation_token } = useParams()

  useEffect(() => {
    //check token
    if (activation_token) {
      const activateUser = async () => {
        try {
          const res = await axios.post('https://haircutsapp.herokuapp.com/api/auth/activation', {
            activation_token
          })

          alert(res.data.message)

          // toast(res.data.message, {
          //     className: "toast-success",
          //     bodyClassName: 'toast-success'
          // })

        } catch (error) {
          alert(error.response.data.message)
          // toast(error.response.data.message, {
          //     className: "toast-failed",
          //     bodyClassName: 'toast-failed'
          // })
        }
      }
      activateUser()
    }

  }, [activation_token]);
  const handleClick = () => {
    history.push("/");
  }
  return (
    <div>
      <Box
        sx={{
          marginTop: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >

        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            fontSize: '50px',
                            fontWeight: 'bold',
                            mt: 2}}>Hair Cuts </Typography>
          <Divider/>
            <Typography component="h1" variant="h5" sx={{mt:3}}>
              Ready To Login ? <Button onClick={handleClick}>Here</Button></Typography>
          </Paper>
        </Box>
      </Box>
    </div>
  )
}

export default Activatelayout