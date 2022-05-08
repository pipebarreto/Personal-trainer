import React, {useState, useEffect, useRef} from 'react';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import AddCustomer from './AddCustomer';
import IconButton from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { Snackbar } from '@mui/material';
import EditCustomer from './EditCustomer';
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';


export default function CustomerList(){
    const[customers, setCustomers]= useState([]);
    const [open, setOpen]= useState(false);
    const [grid, setGrid] = useState(null);
    
    useEffect(()=> fetchData(), []);

  const fetchData =() => {
    fetch('https://customerrest.herokuapp.com/api/customers')
    .then(response=>response.json())
    .then(data=>setCustomers(data.content))
    .catch(err=>console.log(err))
  }

  const deleteCustomer =(link) => {
    if (window.confirm('Are you sure?')){
      fetch (link, {method: 'DELETE'})
      .then (response =>{
        if (!response.ok){
          alert('Something went wrong');
        }else{
          setOpen(true);
          fetchData();
        }
          return;
      })
      .catch(err=>console.log(err))
    }
  }

  const addCustomer =(newCustomer)=>{
    fetch('https://customerrest.herokuapp.com/api/customers',
      {method:'POST',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify(newCustomer)
    })
    .then(response=>{
      if (response.ok) {
        fetchData();
        } 
      else{
       alert('Something went wrong');
      }
    })
    .catch(err => console.error(err))
  }

  const editCustomer =(updatedCustomer, link)=>{
    fetch(link,
      {method:'PUT',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify(updatedCustomer)
    })
    .then(response=>{
      if (response.ok) {
        fetchData();
        } 
      else{
       alert('Something went wrong');
      }
    })
    .catch(err => console.error(err))
  }

  const toExport = () => {
    grid.exportDataAsCsv();
  };

  function onGridReady(params) {
    setGrid(params.api);
  }
  const filter = event => {
    grid.setQuickFilter(event.target.value);
  };
  
  const columns = [
    {field: 'firstname', headerName:'First Name', sortable: true, filter: true, floatingFilter: true},
    {field: 'lastname', headerName:'Last Name', sortable: true, filter: true, floatingFilter: true},
    {field: 'email', headerName:'Email', sortable: true, filter: true, floatingFilter: true},
    {field: 'phone', headerName:'Phone number', sortable: true, filter: true, floatingFilter: true},
    {field: 'streetaddress', headerName:'Street address', sortable: true, filter: true, floatingFilter: true},
    {field: 'postcode', headerName:'Post code', sortable: true, filter: true, floatingFilter: true},
    {field: 'city', headerName:'City', sortable: true, filter: true, floatingFilter: true},
    {
      headerName:'',
      width: 120,
      field: 'links.0.href',
      cellRenderer: params =>  <EditCustomer params={params} editCustomer={editCustomer}/>
    }, 
    {
      headerName:'',
      width: 120,
      field: 'links.0.href',
      cellRenderer: params => <IconButton color="error"
      onClick ={() => deleteCustomer (params.value)}>
        <DeleteIcon />
      </IconButton>
    }         
  ]

    return(
  <>
    <div style ={{margin:5}}>
      <h1>Customer List</h1>

    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      spacing={4}>

       <AddCustomer addCustomer={addCustomer}/>

      <div >
          <input
            style={{width:'1000px'}}
            type="search"
            placeholder="Search"
            onChange={filter}
          />
      </div>

      <Button style={{margin:10}}
      variant="contained"
      color="success"
      onClick={() => toExport()}>
        Export to CSV
      </Button>
    
    </Stack>

<div className="ag-theme-material" style ={{height:700, width: '100%',}}>
    <AgGridReact
      onGridReady={onGridReady}
      rowData={customers}
      columnDefs={columns}
      suppressCellFocus = {true}
      pagination={true}
      paginationPageSize={10}
               />
        </div>    
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={()=> setOpen(false)}
        message ="Customer was deleted succesfully"
      />
    </div>
  </>
  );
}