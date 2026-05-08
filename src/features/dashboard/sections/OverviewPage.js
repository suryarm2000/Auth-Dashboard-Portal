import { Box, Card, CardContent, Grid, Skeleton, Typography } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import CakeIcon from "@mui/icons-material/Cake";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import useFetch from "../../../hooks/useFetch";

const statConfig = [
    {
        key: "totalUsers",
        label: "Total Users",
        icon: <PeopleIcon />,
        color: "#1E3A8A",
        bgcolor: "#EEF2FF"
    },
    {
        key: "avgAge",
        label: "Average Age",
        icon: <CakeIcon />,
        color: "#0369A1",
        bgcolor: "#E0F2FE"
    },
    {
        key: "totalCities",
        label: "Total Cities",
        icon: <LocationCityIcon />,
        color: "#0F766E",
        bgcolor: "#CCFBF1"
    },
    {
        key: "savedUsers",
        label: "Saved Users",
        icon: <BookmarkIcon />,
        color: "#7C3AED",
        bgcolor: "#EDE9FE"
    },
];

function StatCard({ label, value, icon, color, bgcolor, loading }) {
    return (
        <Card variant="outlined" sx={{ borderRadius: 3, borderColor: "#E2E8F0" }}>
            <CardContent>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        <Box
                            sx={{
                                bgcolor: bgcolor,
                                color: color,
                                borderRadius: 1.5,
                                p: 0.6,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                "& svg": { fontSize: "1rem" }
                            }}
                        >
                            {icon}
                        </Box>
                        <Typography variant="body2" color="#94A3B8" fontWeight={500}>
                            {label}
                        </Typography>
                    </Box>

                    {loading ? (
                        <Skeleton variant="text" width={60} height={40} />
                    ) : (
                        <Typography variant="h4" fontWeight={700} color="#1E293B">
                            {value}
                        </Typography>
                    )}

                </Box>
            </CardContent>
        </Card>
    );
}

function OverviewPage({ savedUsers }) {

    const { data, loading, error } = useFetch("https://dummyjson.com/users?limit=14&skip=0");
    const userData = data?.users ?? [];

    // Derived stats
    const totalUsers = userData.length;

    const avgAge = userData.length > 0
        ? Math.round(userData.reduce((sum, u) => sum + u.age, 0) / userData.length)
        : 0;

    const totalCities = new Set(userData.map((u) => u.address.city)).size;

    const statValues = {
        totalUsers,
        avgAge,
        totalCities,
        savedUsers: savedUsers.length
    };

    // Top 5 cities chart data
    const cityCount = userData.reduce((acc, user) => {
        const city = user.address.city;
        acc[city] = (acc[city] || 0) + 1;
        return acc;
    }, {});

    const chartData = Object.entries(cityCount)
        .map(([city, count]) => ({ city, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

    if (error) {
        return (
            <Box sx={{ textAlign: "center", mt: 6 }}>
                <Typography color="error">Failed to load overview data.</Typography>
            </Box>
        );
    }

    return (
        <Box>
            <Typography variant="h6" fontWeight={600} color="#1E293B" mb={3}>
                Overview
            </Typography>

            {/* Stat Cards */}
            <Grid container spacing={2} mb={4}>
                {statConfig.map((stat) => (
                    <Grid item xs={12} sm={6} md={3} key={stat.key}>
                        <StatCard
                            label={stat.label}
                            value={statValues[stat.key]}
                            icon={stat.icon}
                            color={stat.color}
                            bgcolor={stat.bgcolor}
                            loading={loading}
                        />
                    </Grid>
                ))}
            </Grid>

            {/* Bar Chart */}
            <Card variant="outlined" sx={{ borderRadius: 3, borderColor: "#E2E8F0", p: 2 }}>
                <Typography variant="body1" fontWeight={600} color="#1E293B" mb={3}>
                    Top 5 Cities by User Count
                </Typography>
                {loading ? (
                    <Skeleton variant="rectangular" height={250} sx={{ borderRadius: 2 }} />
                ) : (
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={chartData} margin={{ top: 0, right: 20, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                            <XAxis
                                dataKey="city"
                                tick={{ fontSize: 12, fill: "#94A3B8" }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <YAxis
                                tick={{ fontSize: 12, fill: "#94A3B8" }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <Tooltip
                                contentStyle={{
                                    borderRadius: 8,
                                    border: "1px solid #E2E8F0",
                                    fontSize: 13
                                }}
                            />
                            <Bar dataKey="count" fill="#1E3A8A" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </Card>
        </Box>
    );
}

export default OverviewPage;