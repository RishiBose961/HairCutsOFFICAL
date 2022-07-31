import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { Divider, TextField } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 330,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function Profile() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { user } = useContext(AuthContext)

    return (
        <div>
            <Button onClick={handleOpen} sx={{ color: 'black', fontSize: '13px' }}>Profile</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                <Typography><h2>Profile</h2>{user._id}</Typography>
                <Divider/>
                    <Box sx={{display: 'flex',justifyContent: 'center',mt:4}}> 
                        <TextField
                            type='text'
                            name='name'
                            label='First Name'
                            defaultValue={user.firstname}
                        />
                        <TextField
                        sx={{mx:6}}
                            type='text'
                            label='Last Name'
                            name='name'
                            defaultValue={user.lastname}
                        />
                    </Box>
                    <TextField
                        sx={{mt:3}}
                            type='email'
                            label='Email'
                            name='email'
                            fullWidth
                            defaultValue={user.email}
                        />

                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Hair Cuts
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}
