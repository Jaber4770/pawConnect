import React from "react";
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
} from "@mui/material";
import {
    People,
    Pets,
    Campaign,
    AttachMoney,
    Favorite,
    Block,
} from "@mui/icons-material";
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
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxios from "../../Hooks/useAxios";



const Dashboard = () => {
    const theme = useTheme();
    const { user } = useAuth();
    const axios = useAxios();

    const fetchDashboardData = async () => {
        const response = await axios.get("/dashboard-stats");
        // axios throws on error, so no need to check response.ok
        return response.data;
    };

    const { data: dashboardData, isLoading, isError, error } = useQuery({
        queryKey: ["dashboardStats"],
        queryFn: fetchDashboardData,
        staleTime: 1000 * 60 * 5,
        retry: 1,
    });

    if (isLoading) return <Typography>Loading...</Typography>;
    if (isError)
        return (
            <Typography color="error">
                Error loading data: {error.message}
            </Typography>
        );

    const dashboardStats = [
        {
            title: "Total Users",
            value: dashboardData.totalUsers,
            icon: <People fontSize="large" color="primary" />,
        },
        {
            title: "Total Pets",
            value: dashboardData.totalPets,
            icon: <Pets fontSize="large" color="success" />,
        },
        {
            title: "Donation Campaigns",
            value: dashboardData.donationCampaigns,
            icon: <Campaign fontSize="large" color="warning" />,
        },
        {
            title: "Total Donations",
            value: `$${dashboardData.totalDonations.toLocaleString()}`,
            icon: <AttachMoney fontSize="large" color="info" />,
        },
        {
            title: "Adopted Pets",
            value: dashboardData.adoptedPets,
            icon: <Favorite fontSize="large" color="error" />,
        },
        {
            title: "Banned Users",
            value: dashboardData.bannedUsers,
            icon: <Block fontSize="large" sx={{ color: "#f44336" }} />,
        },
    ];

    const COLORS = ["#00C49F", "#FF8042"];

    return (
        <Box p={3}>
            {/* Stat Cards */}
            <Box display="flex" flexWrap="wrap" gap={3}>
                {dashboardStats.map((item, idx) => (
                    <Card
                        key={idx}
                        sx={{
                            flex: "1 1 300px",
                            minWidth: "280px",
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

            {/* Recent Activities */}
            <Box mt={4}>
                <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                    <CardContent>
                        <Typography variant="h6" mb={1}>
                            Recent Activities
                        </Typography>
                        <List>
                            {dashboardData.recentActivities.map((activity, idx) => (
                                <React.Fragment key={idx}>
                                    <ListItem>
                                        <ListItemText primary={activity} />
                                    </ListItem>
                                    {idx < dashboardData.recentActivities.length - 1 && (
                                        <Divider />
                                    )}
                                </React.Fragment>
                            ))}
                        </List>
                    </CardContent>
                </Card>
            </Box>

            {/* Charts Row */}
            <Box display="flex" flexWrap="wrap" gap={3} mt={4}>
                {/* Monthly Donations Chart */}
                <Card sx={{ flex: "1 1 500px", borderRadius: 3, boxShadow: 3 }}>
                    <CardContent>
                        <Typography variant="h6" mb={2}>
                            Monthly Donations
                        </Typography>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={dashboardData.monthlyDonations}>
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
                <Card sx={{ flex: "1 1 500px", borderRadius: 3, boxShadow: 3 }}>
                    <CardContent>
                        <Typography variant="h6" mb={2}>
                            Pet Adoption Status
                        </Typography>
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie
                                    data={dashboardData.adoptionPieData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    label
                                >
                                    {dashboardData.adoptionPieData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                        />
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
