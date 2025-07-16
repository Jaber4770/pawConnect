import React from "react";
// import { useNavigate } from "react-router-dom";
import {
    Box,
    CssBaseline,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    AppBar,
    IconButton,
} from "@mui/material";

import PetsIcon from '@mui/icons-material/Pets';
import ListAltIcon from '@mui/icons-material/ListAlt';
import RequestPageIcon from '@mui/icons-material/RequestPage';
import CampaignIcon from '@mui/icons-material/Campaign';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, Outlet, useLocation, useNavigate } from "react-router";
import PeopleIcon from '@mui/icons-material/People';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';


const drawerWidth = 240;

const menuItems = [
    { text: "Add a Pet", icon: <PetsIcon />, path: "add-a-pet" },
    { text: "My Added Pets", icon: <ListAltIcon />, path: "my-added-pets" },
    { text: "Adoption Request", icon: <RequestPageIcon />, path: "adoption-request" },
    { text: "Create Donation Campaign", icon: <CampaignIcon />, path: "create-donation-campaign" },
    { text: "My Donation Campaigns", icon: <VolunteerActivismIcon />, path: "my-donation-campaigns" },
    { text: "My Donations", icon: <MonetizationOnIcon />, path: "my-donations" },
    { text: "Users", icon: <PeopleIcon />, path: "users" },
    { text: "All Donations", icon: <AttachMoneyIcon />, path: "all-donations" },
    { text: "All Pets", icon: <PetsIcon />, path: "all-pets" },
];


export default function DashboardLayout() {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const navigate = useNavigate();
    const location = useLocation();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <Toolbar>
                <Link to={'/dashboard'}>
                    <Typography variant="h6" noWrap component="div">
                        Dashboard
                    </Typography>
                </Link>
            </Toolbar>
            <List>
                {menuItems.map((item, index) => (
                    <ListItem
                        key={item.text}
                        disablePadding
                        selected={selectedIndex === index}
                        onClick={() =>{
                            navigate(item.path);
                            setSelectedIndex(index)}}
                        
                    >
                        <ListItemButton>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
    );

    const currentTitle = React.useMemo(() => {
        const found = menuItems.find(item => location.pathname.includes(item.path));
        return found ? found.text : "Dashboard";
    }, [location.pathname]);

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />

            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` }
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: "none" } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    {<Typography variant="h6" noWrap component="div">
                        {currentTitle}
                    </Typography>}
                </Toolbar>
            </AppBar>

            {/* Drawer for desktop */}
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: "none", sm: "block" },
                    "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
                }}
                open
            >
                {drawer}
            </Drawer>

            {/* Drawer for mobile */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }} // Better open performance on mobile
                sx={{
                    display: { xs: "block", sm: "none" },
                    "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
                }}
            >
                {drawer}
            </Drawer>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    mt: 8,                 // height of app bar
                    ml: { sm: `${drawerWidth}px` },  
                }}
            >
                <Typography>
                    <Outlet></Outlet>
                </Typography>
            </Box>
        </Box>
    );
}
