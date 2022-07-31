import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { AuthContext } from '../../context/AuthContext';
import { TextField, Box,Grid } from '@mui/material';





const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Myaccount() {
    const [open, setOpen] = React.useState(false);

    const { user } = useContext(AuthContext)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button sx={{ color: 'black', fontSize: '13px' }} onClick={handleClickOpen}>
                Account
            </Button>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar sx={{ backgroundImage: 'linear-gradient(to left, #ec8a3f, #cba534, #a3ba4b, #74ca76, #2dd6aa);', }}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            My Account
                        </Typography>
                        <Typography autoFocus color="inherit">
                            {user.firstname} {user.lastname}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Box 
                sx={{
                    
                    border: '1px solid',
                    borderRadius: '5px',    
                    mt:3,
                    ml:2,
                    width: '90%',
                }}> 
                <Typography sx={{fontSize:24,fontWeight:'bold'}}>User Info</Typography>
                <Divider/>
                <List sx={{
                    marginTop: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <Grid item xs={12} sm={6} sx={{mt:3}}>
                        <TextField label="First Name" sx={{mx:2}} defaultValue={user.firstname}></TextField>
                        <TextField label="Last Name" sx={{mx:2}} defaultValue={user.lastname}></TextField>
                       
                    </Grid>
                    <TextField label="Phone" sx={{mt:5,width: '50%'}} defaultValue={user.phone}></TextField>
                    <TextField label="Email" sx={{mt:5,width: '50%'}} defaultValue={user.email}></TextField>
                    <TextField label="Password" sx={{mt:5,width: '50%'}} defaultValue={user.password}></TextField>
                    <TextField label="Confirm Password" sx={{mt:5,width: '50%'}} ></TextField>
                    <Button color='warning' variant="contained" sx={{mt:5,mb:5,width: '50%'}}>Update</Button>
                </List>
                </Box>
            </Dialog>
        </div>
    );
}
