import React, { useContext, useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { AuthContext } from '../../context/AuthContext';
import { Rating } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment';


export default function BasicTable() {

    const { token } = useContext(AuthContext)
    const [mypics, setPics] = useState([])

    useEffect(() => {
        fetch('/api/auth/getorderhair', {
            headers: {
                'Authorization': token
            }
        }).then(res => res.json())
            .then(result => {
                setPics(result.mypost)
                console.log(result.mypost);
            })
    }, [])


    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Hair Shop Name</TableCell>
                        <TableCell align="right">Number of Hair Cuts</TableCell>
                        <TableCell align="right" Fat>Rating</TableCell>
                        <TableCell align="right">Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {mypics.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.shopname}
                            </TableCell>
                            <TableCell align="right">{row.nohaircut}</TableCell>
                            <TableCell align="right"><Rating sx={{ mt: 1 }}
                                defaultValue={row.rating}
                                size="large"
                                readOnly
                                name='rating'
                            /></TableCell>
                            <TableCell align="right">{row.date} </TableCell>
                            {/* <TableCell align="right">{row.protein}</TableCell> */}
                        </TableRow>
                    ))}
                </TableBody>
                
            </Table>
        </TableContainer>
    );
}
