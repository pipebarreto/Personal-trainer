import './App.css';
import CustomerList from './components/CustomerList';
import {  BrowserRouter,  Routes,  Route,   Link} from"react-router-dom";
import React from 'react';
import { AppBar, Menu, MenuItem } from '@mui/material';
import { Toolbar } from '@mui/material';
import Typography from '@mui/material/Typography';
import TrainingList from './components/TrainingList';
import Schedule from './components/Schedule';
import Statistics from './components/Statistics';
import { NavLink } from 'react-router-dom';
import { Drawer, Divider, List, ListItem } from '@mui/material';


function App() {


  return (
  <>
    <AppBar position='static'>
      <Toolbar>      
        <Typography variant='h6' noWrap component="div"> Personal Trainer</Typography>        
      </Toolbar>    
    </AppBar>
  <div style ={{margin:5}}>
  <BrowserRouter >
  
  <NavLink
        to="/"
        style={({ isActive }) => (isActive ? {
          fontWeight: 'bold',
          padding: '5px',} : 
        {padding: '20px',})}>
        Customer list
  </NavLink>
  <NavLink
        to="/training"
        style={({ isActive }) => (isActive ? {
          fontWeight: 'bold',
          padding: '5px',} : 
        {padding: '20px',})}>
        Training list
  </NavLink>
  <NavLink
        to="/schedule"
        style={({ isActive }) => (isActive ? {
          fontWeight: 'bold',
          padding: '5px',} : 
        {padding: '20px',})}>
        Calendar
  </NavLink>
  <NavLink
        to="/statistics"
        style={({ isActive }) => (isActive ? {
          fontWeight: 'bold',
          padding: '5px',} : 
        {padding: '20px',})}>
        Statistics
  </NavLink>
          
  <Routes>
  <Route path="/"element={<CustomerList />} />
  <Route path="/training"element={<TrainingList/>} />
  <Route path="/schedule"element={<Schedule/>} />
  <Route path="/statistics"element={<Statistics/>}/>

    </Routes>
  </BrowserRouter>

  </div>
  </>
  );
}

export default App;
