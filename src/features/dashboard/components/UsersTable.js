import { Box, Table, TableBody, TableCell, TableContainer, TablePagination, TableHead, TableRow, TextField } from "@mui/material";
import { useEffect, useState } from "react";

function UsersTable(){

    const [userData, setUserData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const filteredUsers = userData.filter((user) => {
        const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
        const query = searchTerm.toLowerCase();

        return fullName.includes(query)
    });

    const paginatedUsers = filteredUsers.slice(
        page*rowsPerPage,
        page*rowsPerPage + rowsPerPage
    )

    useEffect(() => {
        async function fetchData(){
            try{
                const res = await fetch("https://dummyjson.com/users?limit=100&skip=0");
                const data = await res.json();
                setUserData(data.users);
            } catch(error){
                console.error("Failed to fetch users:", error);
            }
        }
        fetchData();
    }, [])

    function handleChangePage(e, newPage){
        setPage(newPage);
    }

    function handleChangeRowsPerPage(e) {
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
    }

    function handleSearchChange(e) {
        setSearchTerm(e.target.value);
        setPage(0);
    }

    return(
        <Box>
            <TextField
                label="Search name"
                variant="filled"
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Country</TableCell>
                            <TableCell>City</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Age</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedUsers.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{`${row.firstName} ${row.lastName}`}</TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{row.address.country}</TableCell>
                                <TableCell>{row.address.city}</TableCell>
                                <TableCell>{row.phone}</TableCell>
                                <TableCell>{row.age}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                component="div"
                count={filteredUsers.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 25, 50]}
            />
        </Box>
    )
}

export default UsersTable;