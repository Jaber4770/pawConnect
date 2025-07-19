import React, { useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    List,
    ListItem,
    ListItemText,
    Divider,
    useTheme,
} from '@mui/material';
import {
    People,
    Pets,
    Campaign,
    AttachMoney,
    Favorite,
    Block,
} from '@mui/icons-material';
import {
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

const Dashboard = () => {
    const theme = useTheme();

    const [dashboardStats] = useState([
        {
            title: 'Total Users',
            value: 100,
            icon: <People fontSize="large" color="primary" />,
        },
        {
            title: 'Total Pets',
            value: 40,
            icon: <Pets fontSize="large" color="success" />,
        },
        {
            title: 'Donation Campaigns',
            value: 12,
            icon: <Campaign fontSize="large" color="warning" />,
        },
        {
            title: 'Total Donations',
            value: '$2,500',
            icon: <AttachMoney fontSize="large" color="info" />,
        },
        {
            title: 'Adopted Pets',
            value: 18,
            icon: <Favorite fontSize="large" color="error" />,
        },
        {
            title: 'Banned Users',
            value: 3,
            icon: <Block fontSize="large" sx={{ color: '#f44336' }} />,
        },
    ]);

    const recentActivities = [
        'John adopted Bella 🐶',
        'Anna donated $50 to Tiger 🐱',
        'Michael paused his donation campaign 🛑',
        'Liam added a new pet: Rex 🐕',
        'Emma became an admin 👑',
    ];

    const donationData = [
        { month: 'Jan', amount: 300 },
        { month: 'Feb', amount: 500 },
        { month: 'Mar', amount: 700 },
        { month: 'Apr', amount: 400 },
        { month: 'May', amount: 800 },
        { month: 'Jun', amount: 650 },
    ];

    const adoptionPieData = [
        { name: 'Adopted', value: 18 },
        { name: 'Not Adopted', value: 22 },
    ];

    const COLORS = ['#00C49F', '#FF8042'];

    return (
        <Box p={3}>
            <Typography variant="h4" mb={3}>
                Dashboard Overview
            </Typography>

            {/* Stat Cards */}
            <Box display="flex" flexWrap="wrap" gap={3}>
                {dashboardStats.map((item, idx) => (
                    <Card
                        key={idx}
                        sx={{
                            flex: '1 1 300px',
                            minWidth: '280px',
                            borderRadius: 3,
                            boxShadow: 3,
                        }}
                    >
                        <CardContent>
                            <Box display="flex" alignItems="center" gap={2}>
                                {item.icon}
                                <Box>
                                    <Typography variant="subtitle1" fontWeight="medium">
                                        {item.title}
                                    </Typography>
                                    <Typography variant="h6" fontWeight="bold">
                                        {item.value}
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                ))}
            </Box>

            {/* Recent Activities - Full Width */}
            <Box mt={4}>
                <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                    <CardContent>
                        <Typography variant="h6" mb={1}>
                            Recent Activities
                        </Typography>
                        <List>
                            {recentActivities.map((activity, idx) => (
                                <React.Fragment key={idx}>
                                    <ListItem>
                                        <ListItemText primary={activity} />
                                    </ListItem>
                                    {idx < recentActivities.length - 1 && <Divider />}
                                </React.Fragment>
                            ))}
                        </List>
                    </CardContent>
                </Card>
            </Box>

            {/* Charts Row */}
            <Box display="flex" flexWrap="wrap" gap={3} mt={4}>
                {/* Monthly Donations Chart */}
                <Card sx={{ flex: '1 1 500px', borderRadius: 3, boxShadow: 3 }}>
                    <CardContent>
                        <Typography variant="h6" mb={2}>
                            Monthly Donations
                        </Typography>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={donationData}>
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="amount" fill={theme.palette.primary.main} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Adoption Pie Chart */}
                <Card sx={{ flex: '1 1 500px', borderRadius: 3, boxShadow: 3 }}>
                    <CardContent>
                        <Typography variant="h6" mb={2}>
                            Pet Adoption Status
                        </Typography>
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie
                                    data={adoptionPieData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    label
                                >
                                    {adoptionPieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
};

export default Dashboard;
