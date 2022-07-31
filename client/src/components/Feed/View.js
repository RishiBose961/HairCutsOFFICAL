import React, { useContext,useState,useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { AuthContext } from '../../context/AuthContext';
import { TextField, Box,Grid } from '@mui/material';
import BasicTable from './Tablee';
import { Link ,useParams} from 'react-router-dom';





const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function View() {

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
              View Appointment 
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
                            View Appointment : {user.firstname} {user.lastname}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Box>
                <BasicTable/>

                </Box>
            </Dialog>
        </div>
    );
}
