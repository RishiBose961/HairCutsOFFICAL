import React, { useContext } from 'react'
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios';
import Appbar from '../AppBar/Appbar';
import Searcj from '../Search/Searcj';


const Slidebar = () => {

    const { dispatch } = useContext(AuthContext)

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.get("api/auth/signout")
            localStorage.removeItem("_appSignging")
            dispatch({ type: "SIGNOUT" })
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <Toolbar sx={{
                backgroundImage: 'linear-gradient(to left, #ec8a3f, #cba534, #a3ba4b, #74ca76, #2dd6aa);',
                backgroundColor: '',
                borderBottom: 0,
                borderColor: 'divider',
                paddingTop: 2,
                paddingBottom: 1,
                borderRadius: 8,
                boxShadow: 'unset'
                
            }}
            >

                <Tooltip title="Copyright © Hair Cuts.">
                    <Button size="small">©</Button>
                </Tooltip>
                <Typography
                    component="h2"
                    variant="h5"
                    color="inherit"
                    align="left"
                    noWrap
                    sx={{ flex: 1 }}
                >
                   Hair Cuts
                    
                </Typography>
                <Searcj/>
            
                
                <Appbar />
                <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={handleClick}
                >
                    Logout
                </Button>
            </Toolbar>
            <Toolbar
                component="nav"
                variant="dense"
                sx={{ justifyContent: 'space-between', overflowX: 'auto' }}
            >
            </Toolbar>
          
        </div>

    )
}


export default Slidebar