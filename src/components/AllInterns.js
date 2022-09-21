import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography, Stack, Button } from '@mui/material'
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


const AllInterns = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = React.useState(true)
  const [interns, setInterns] = React.useState([])


  React.useEffect(() => {
    getAllEmployee()
  }, [])

  const getAllEmployee = () => {
    axios.get('https://emp-management-backend.vercel.app/dashboard/getInterns')
      .then((response) => {
        console.log(response.data.data)
        setLoading(false)
        setInterns(response.data.data)
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
      '/allinterns/editemployee',
      { state: { employee } }
    );
  }

  return (
    <Stack sx={{ marginTop: '5rem' }}>
      <Typography variant='h3'>Allinterns</Typography>
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
              {interns.sort((a, b) =>
                a.email >  b.email ? 1 : -1,
              ).map((intern) => (
                <StyledTableRow key={intern.email}>
                  <StyledTableCell component="th" scope="row">
                    {intern.email}
                  </StyledTableCell>
                  <StyledTableCell align="left">{intern.name}</StyledTableCell>
                  <StyledTableCell align="left">{intern.gender}</StyledTableCell>
                  <StyledTableCell align="left">{intern.employee_type}</StyledTableCell>
                  <StyledTableCell align="left">{intern.createdAt}</StyledTableCell>
                  <StyledTableCell align="left">{intern.status}</StyledTableCell>
                  <StyledTableCell align="left">
                    <Button type='small' variant='secondary' onClick={() => editEmployee(intern)}>edit</Button>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <Button type='small' variant='secondary' onClick={() => handleDelete(intern._id)}  >Delete</Button>
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

export default AllInterns