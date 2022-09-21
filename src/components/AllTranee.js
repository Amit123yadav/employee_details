import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography, Button, Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));



const AllTranee = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = React.useState(true)
  const [trainees, setTrainee] = React.useState([])


  React.useEffect(() => {
    getAllEmployee()
  }, [])

  const getAllEmployee = () => {
    axios.get('https://emp-management-backend.vercel.app/dashboard/getTrainees')
      .then((response) => {
        console.log(response)
        setLoading(false)
        setTrainee(response.data.data)
      })
  }
  const handleDelete = async (id) => {
    const users = {
      id,
    }
    try {
      const response = await axios.post(`https://emp-management-backend.vercel.app/employee/deleteEmployee`, users)
      console.log("addEmploye", response.data.success)
    } catch (error) {
      alert('please fill data')
    }
    getAllEmployee()
  }
  const editEmployee = (employee) => {
    navigate(
      '/alltranee/editemployee',
      { state: { employee } }
    );
  }

  return (
    <Stack sx={{ marginTop: '5rem' }}>
      <Typography variant='h3'>AllTrainee</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell >Employee Email</StyledTableCell>
              <StyledTableCell align="left">Name</StyledTableCell>
              <StyledTableCell align="left">Gender</StyledTableCell>
              <StyledTableCell align="left">Employee_Type</StyledTableCell>
              <StyledTableCell align="left">Employee_CreatedAt</StyledTableCell>
              <StyledTableCell align="left">Employee_Status</StyledTableCell>
              <StyledTableCell align="left" >Edit_Section</StyledTableCell>
              <StyledTableCell align="left" >Delete_Section</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? "Loading" : (<>
              {trainees.sort((a, b) =>
                a.email > b.email ? 1 : -1,
              ).map((trainee) => (
                <StyledTableRow key={trainee.email}>
                  <StyledTableCell component="th" scope="row">
                    {trainee.email}
                  </StyledTableCell>
                  <StyledTableCell align="left">{trainee.name}</StyledTableCell>
                  <StyledTableCell align="left">{trainee.gender}</StyledTableCell>
                  <StyledTableCell align="left">{trainee.employee_type}</StyledTableCell>
                  <StyledTableCell align="left">{trainee.createdAt}</StyledTableCell>
                  <StyledTableCell align="left">{trainee.status}</StyledTableCell>
                  <StyledTableCell align="left">
                    <Button type='small' variant='secondary' onClick={() => editEmployee(trainee)}>edit</Button>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <Button type='small' variant='secondary' onClick={() => handleDelete(trainee._id)}  >Delete</Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </>)}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  )
}

export default AllTranee;