import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar';
import { Stack, Tab, Tabs, Toolbar, Drawer, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';


const Header = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    return (
        <>
            <AppBar position='fixed' sx={{ background: '#063970' }} >
                <Toolbar >
                    <>
                        <MenuIcon
                            sx={{ cursor: 'pointer' }}
                            onClick={() => setIsDrawerOpen(true)}
                        />
                        <Drawer anchor='left'
                            open={isDrawerOpen}
                            onClose={() => setIsDrawerOpen(false)}
                        >
                            <Box p={2} width='250px' textAlign='center' role='presentation'>
                                <Typography variant='h5' component='div'>Side Bar</Typography>
                                <Stack onClick={()=> setIsDrawerOpen(false)}>
                                    <Tab label='All Employee' to='allemployee'  component={Link}/>
                                    <Tab label='All Interns' to='allinterns' component={Link} />
                                    <Tab label='All Tranee' to='alltranee'  component={Link}/>
                                </Stack>
                            </Box>

                        </Drawer>
                    </>
                    <Tabs textColor='#f44336'>
                        <Tab label='Employee Details' to='/'  component={Link}/>
                    </Tabs>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Header;