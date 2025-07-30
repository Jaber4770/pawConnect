import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link, NavLink, useNavigate } from 'react-router';
import PawLogo from '../Logo/PawLogo';
import useAuth from '../../Hooks/useAuth';
import { AuthContext } from '../../Contexts/AuthContext/AuthContext';

const pages = ['Home', 'Pet Listing', 'Donation Campaigns'];
const settings = ['Profile', 'Dashboard', 'Logout'];

function Navbar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const navigate = useNavigate();
    const { user, logOutUser } = useAuth();


    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        // Example: clear token and redirect
        localStorage.removeItem('access-token'); // or however you store the token
        logOutUser();
        navigate('/login'); // make sure to import useNavigate from react-router-dom
    };
    

    return (
        <AppBar position="sticky" sx={{ backgroundColor: 'white', color: 'black' }}>
            <Container disableGutters maxWidth={false}
                sx={{
                    maxWidth: '1280px',
                    mx: 'auto'
                }}>
                <Toolbar disableGutters>

                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        <PawLogo></PawLogo>

                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                                backgroundColor: 'transparent', // This sets the menu background to transparent
                                color: '#ff914d',
                                '& .MuiPaper-root': {
                                    // backgroundColor: 'transparent', // Ensures the Paper (actual visible part) is also transparent
                                    boxShadow: 'none',              // Remove any shadow if needed
                                },
                            }}
                        >
                            {pages.map((page) => {
                                const path = `/${page.toLowerCase().replace(/\s+/g, '-')}`; // e.g., 'Pet Listing' => '/pet-listing'
                                return (
                                    <NavLink key={page} to={path} style={{ textDecoration: 'none' }}>
                                        <MenuItem
                                            onClick={handleCloseNavMenu}
                                            sx={{
                                                color: '#ff914d',
                                                backgroundColor: 'transparent',
                                                '&:hover': {
                                                    // Optional hover background
                                                    // backgroundColor: 'rgba(255, 145, 77, 0.1)',
                                                },
                                            }}
                                        >
                                            <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                                        </MenuItem>
                                    </NavLink>
                                );
                            })}


                        </Menu>
                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => {
                            const path = `/${page.toLowerCase().replace(/\s+/g, '-')}`; // Converts 'Pet Listing' to '/pet-listing'
                            return (
                                <NavLink key={page} to={path} style={{ textDecoration: 'none' }}>
                                    <Button
                                        onClick={handleCloseNavMenu}
                                        sx={{
                                            my: 2,
                                            color: '#ff914d',
                                            backgroundColor: 'transparent',
                                            marginRight: '5px',
                                            display: 'block',
                                            border: '1px solid #ff914d',
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                backgroundColor: '#ff914d',
                                                color: 'white',
                                            },
                                        }}
                                    >
                                        {page}
                                    </Button>
                                </NavLink>
                            );
                        })}

                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        {
                            user?.email ? 
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        {/* user profilephoto or Login */}
                                        <Avatar sx={{
                                            width: "60px",
                                            height:"60px"
                                        }} alt="Remy Sharp" src={user?.photoURL} />
                                    </IconButton>
                                </Tooltip>
                                :
                                <>
                                    {/* user profilephoto or Login */}
                                    <Link to="/login" className="btn px-2 py-1 rounded-sm border border-[#ff9416] text-[#ff9416] hover:bg-[#ff9416] hover:text-white transition duration-300 font-semibold">Login</Link>
                                </>
                        }

                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => {
                                if (setting === 'Logout') {
                                    return (
                                        <MenuItem key={setting} onClick={() => {
                                            handleCloseUserMenu();
                                            handleLogout(); // your logout function
                                        }}>
                                            <Typography sx={{ textAlign: 'center', color: 'red' }}>{setting}</Typography>
                                        </MenuItem>
                                    );
                                }

                                const path = `/${setting.toLowerCase().replace(/\s+/g, '-')}`;
                                return (
                                    <NavLink key={setting} to={path} style={{ textDecoration: 'none' }}>
                                        <MenuItem onClick={handleCloseUserMenu}>
                                            <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                                        </MenuItem>
                                    </NavLink>
                                );
                            })}

                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Navbar;
