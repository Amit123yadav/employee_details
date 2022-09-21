import './App.css';
import { Stack } from '@mui/material';
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import AllEmployee from './components/AllEmployee'
import AllInterns from './components/AllInterns'
import AllTranee from './components/AllTranee'
import Home from './components/Home';
import AddEmploy from './components/AddEmploy';
import EditEmployee from './components/EditEmployee';

function App() {
  return (
    <Stack className="App">
        <Header/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='allemployee' element={<AllEmployee />} />
        <Route path='/allemployee/addemployee' element={<AddEmploy/>} />
        <Route path='/allemployee/editemployee' element={<EditEmployee />} />
        <Route path='/allinterns/editemployee' element={<EditEmployee />} />
        <Route path='/alltranee/editemployee' element={<EditEmployee />} />
        <Route path='allinterns' element={<AllInterns />} />
        <Route path='alltranee' element={<AllTranee />} />
      </Routes>
    </Stack>
  );
}

export default App;
