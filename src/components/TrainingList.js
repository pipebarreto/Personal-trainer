import React, {useState, useEffect, useRef} from 'react';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AddTraining from './AddTraining';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/Button';
import { Snackbar } from '@mui/material';
import EditTraining from './EditTraining';

export default function TrainingList(props) {

const [trainings, setTrainings] = useState([]);
const [names, setNames] = useState([]);
const [open, setOpen]= useState(false);
const [grid, setGrid] = useState(null);

  useEffect(()=> fetchData(), []); 

  const fetchData =() => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
    .then(response=>response.json())
    .then(data=>setNames(data))
    .catch(err=>console.log(err))
  }

  const addTraining =(newTraining)=>{
    fetch('https://customerrest.herokuapp.com/api/trainings',
      {method:'POST',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify(newTraining)
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

  const deleteTraining =(link) => {
    if (window.confirm('Are you sure?')){
      fetch ('https://customerrest.herokuapp.com/api/trainings/'+link,
       {method: 'DELETE'})
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

  const editTraining =(updatedTraining, link)=>{
    fetch('https://customerrest.herokuapp.com/api/trainings/'+link,
      {method:'PUT',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify(updatedTraining)
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

  function onGridReady(params) {
    setGrid(params.api);
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
    {field: 'date', sortable: true, filter: true, floatingFilter: true,
      cellRendererFramework : params => new Date(params.value).toISOString().substring(0, 10)},  
    {field: 'activity', sortable: true, filter: true, floatingFilter: true},
    {field: 'duration', sortable: true, filter: true, floatingFilter: true},
    {field: 'customer.id', sortable: true, filter: true, floatingFilter: true},
    {field: 'customer.firstname', sortable: true, filter: true, floatingFilter: true},
    {field: 'customer.lastname', sortable: true, filter: true, floatingFilter: true},
    {
      headerName:'',
      width: 120,
      field: 'id',
      cellRenderer: params =>  <EditTraining params={params} editTraining={editTraining}/>
    },
    {
      headerName:'',
      width: 120,
      field: 'id',
      cellRenderer: params => <IconButton color="error"
      onClick ={() => deleteTraining (params.value)}>
        <DeleteIcon />
      </IconButton>
    }  
    
  ]

  return(
    <>
    <div style ={{margin:5}}>

    <h1>Training List</h1>
        
      <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      spacing={4}>

       <AddTraining addTraining={addTraining}/>

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
           rowData={names}
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
    message ="Training was deleted succesfully"
    />
    </div>
  </>
);

}