import { Box, Typography, Grid, Card, CardContent, Avatar, IconButton, Stack } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import BookmarkIcon from "@mui/icons-material/Bookmark";

function SavedUsersPage({ savedUsers, onSaveUsers }) {

    function handleRemove(userId) {
        const updated = savedUsers.filter((user) => user.id !== userId);
        onSaveUsers(updated);
    }

    if (savedUsers.length === 0) {
        return (
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    mt: 10,
                    gap: 2
                }}
            >
                <BookmarkIcon sx={{ fontSize: 48, color: "#CBD5E1" }} />
                <Typography variant="h6" color="#94A3B8" fontWeight={500}>
                    No saved users yet
                </Typography>
                <Typography variant="body2" color="#CBD5E1">
                    Go to Users and select the rows you want to save.
                </Typography>
            </Box>
        );
    }

    return (
        <Box>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
                <Typography variant="h6" fontWeight={600} color="#1E293B">
                    Saved Users
                    <Typography component="span" variant="body2" color="#94A3B8" ml={1}>
                        ({savedUsers.length})
                    </Typography>
                </Typography>
            </Stack>

            <Grid container spacing={2}>
                {savedUsers.map((user) => (
                    <Grid item xs={12} sm={6} md={4} key={user.id}>
                        <Card
                            variant="outlined"
                            sx={{
                                borderRadius: 3,
                                borderColor: "#E2E8F0",
                                "&:hover": { boxShadow: "0 4px 12px #0F172A14" },
                                transition: "box-shadow 0.2s ease"
                            }}
                        >
                            <CardContent>
                                <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                                    <Stack direction="row" spacing={1.5} alignItems="center">
                                        <Avatar
                                            src={user.image}
                                            sx={{ width: 40, height: 40 }}
                                        >
                                        </Avatar>
                                        <Box>
                                            <Typography variant="body1" fontWeight={600} color="#1E293B">
                                                {`${user.firstName} ${user.lastName}`}
                                            </Typography>
                                            <Typography variant="body2" color="#94A3B8">
                                                {user.address.city}
                                            </Typography>
                                        </Box>
                                    </Stack>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleRemove(user.id)}
                                        sx={{ color: "#CBD5E1", "&:hover": { color: "#EF4444" } }}
                                    >
                                        <DeleteOutlineIcon fontSize="small" />
                                    </IconButton>
                                </Stack>

                                <Stack spacing={0.5} mt={2}>
                                    <Typography variant="body2" color="#64748B">
                                        {user.email}
                                    </Typography>
                                    <Typography variant="body2" color="#64748B">
                                        {user.phone}
                                    </Typography>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default SavedUsersPage;