import React from 'react'
import {
    TextField,
    Button,
    Box,
    Grid,
    Typography
} from '@mui/material'
const Reset = () => {
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
                Reset Password
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                    />
                    <TextField
                        sx={{ mt: 3 }}
                        required
                        fullWidth
                        name="cf_password"
                        label="Confirm Password"
                        type="password"
                        id="password"
                    />
                </Grid>
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

export default Reset