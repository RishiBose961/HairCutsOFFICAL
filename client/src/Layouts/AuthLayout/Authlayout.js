import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Container, Paper } from '@mui/material'
import SignUp from '../../components/Register/Register';
import SignIn from '../../components/Login/Login';
import SignInPhone from '../../components/Login/LoginwithPhone';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };




    return (
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Login" {...a11yProps(0)} />
                            <Tab label="Login with Phone" {...a11yProps(1)} />
                            <Tab label="Register" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                    <Typography
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            fontSize: '50px',
                            fontWeight: 'bold',
                            mt: 2
                        }}>Hair Cuts</Typography>
                    <TabPanel value={value} index={0}>
                        <SignIn />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <SignInPhone />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <SignUp />
                    </TabPanel>
                </Box>
            </Paper>
        </Container>

    );
}
