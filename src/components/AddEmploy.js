import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { MenuItem, Stack, Typography, Button, Grid } from '@mui/material'
import axios from 'axios';
const employees = [
    {
        value: 'onJob',
        label: 'onJob',
    },
    {
        value: 'intern',
        label: 'intern',
    },
    {
        value: 'trainee',
        label: 'trainee',
    },
];

const AddEmploy = () => {
    const [name, setname] = React.useState('')
    const [date_of_birth, setdate_of_birth] = React.useState('')
    const [mobile, setmobile] = React.useState('')
    const [email, setemail] = React.useState('')
    const [gender, setgender] = React.useState('')
    const [employee_type, setemployee_type] = React.useState('');
    const [training_period, settraining_period] = React.useState('')
    const [internship_period, setinternship_period] = React.useState('')
    const [joining_date, setjoining_date] = React.useState('')


    const handleSubmit = async (e) => {
        e.preventDefault();
        const users = {
            name,
            date_of_birth,
            mobile,
            gender,
            email,
            employee_type,
            training_period,
            internship_period,
            joining_date,
        }


        try {
            const response = await axios.post('https://emp-management-backend.vercel.app/employee/addEmployee', users)
            console.log("addEmploye", response)
        } catch (error) {
            alert('please fill data')
        }

        setname('')
        setdate_of_birth('')
        setmobile('')
        setgender('')
        setemail('')
        setemployee_type('')
        settraining_period('')
        setinternship_period('')
        setjoining_date('')
        
    }
    return (
        <Stack sx={{ border: '1px solid black', margin: '5rem auto', width: '700px' }} >
            <Typography variant='h4' sx={{ fontWeight: 'bold', marginTop: '0.5rem' }}>Add Employee</Typography>
            <FormControl onSubmit={handleSubmit}>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <Grid container spacing={1} >
                        <Grid spacing={2} sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                            <TextField type='text' sx={{ width: '300px', margin: '1rem' }} label="Name" name='name' color="secondary" value={name} onChange={(e) => setname(e.target.value)} focused />
                            <TextField type='date' sx={{ width: '300px', margin: '1rem' }} label="date_of_birth" name='date_of_birth' color="secondary" value={date_of_birth} onChange={(e) => setdate_of_birth(e.target.value)} focused />
                        </Grid>
                        <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <TextField type='text' sx={{ width: '300px', margin: '1rem' }} label="phone_number" name='phone_number' color="secondary" value={mobile} onChange={(e) => setmobile(e.target.value)} focused />
                            <FormLabel id="demo-row-radio-buttons-group-label" sx={{ marginLeft: '1rem' }}>Gender</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                sx={{ width: '300px', margin: '1rem' }}
                            >
                                <FormControlLabel value="female" name='gender' control={<Radio />} label="Female" onChange={(e) => setgender(e.target.value)} />
                                <FormControlLabel value="male" name='gender' control={<Radio />} label="Male" onChange={(e) => setgender(e.target.value)} />
                            </RadioGroup>
                        </Grid>
                        <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <TextField type='email' sx={{ width: '300px', margin: '1rem' }} label="Email" name='email' color="secondary" value={email} onChange={(e) => setemail(e.target.value)} focused />
                            <TextField
                                id="outlined-select-currency"
                                select
                                label="employee_type"
                                value={employee_type}
                                onChange={(event) => setemployee_type(event.target.value)}
                                // helperText="Please select your Profile"
                                sx={{ width: '300px', margin: '1rem' }}
                            >
                                {employees.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <TextField type='number' sx={{ width: '300px', margin: '1rem' }} label="training_period" color="secondary" value={training_period} onChange={(e) => settraining_period(e.target.value)} focused />
                            <TextField type='number' sx={{ width: '300px', margin: '1rem' }} label="internship_period" color="secondary" value={internship_period} onChange={(e) => setinternship_period(e.target.value)} focused />
                        </Grid>
                        <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <TextField type='date' sx={{ width: '300px', margin: '1rem' }} label="joining_date" color="secondary" value={joining_date} onChange={(e) => setjoining_date(e.target.value)} focused />
                        </Grid>
                    </Grid>
                    <Stack sx={{ margin: 'auto' }}>
                        <Button variant='contained' color='success' sx={{ width: '200px', marginLeft: '15rem' }} type='submit'>Submit</Button>
                    </Stack>
                </Box>

            </FormControl>

        </Stack>
    )
}

export default AddEmploy;