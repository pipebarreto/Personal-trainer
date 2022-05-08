import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/Button';
import DateFnsUtils from '@date-io/date-fns'; 
import {useState, useRef} from 'react';
import {
    DatePicker,
    MuiPickersUtilsProvider,
  } from '@material-ui/pickers';

export default function EditTraining({ params, editTraining}) {
  const [open, setOpen] = React.useState(false);
  const [selectedDate, handleDateChange] = React.useState(new Date());
  const[training, setTraining]=React.useState({
      date:'',
      activity:'',
      duration: '',
  });
  

  const handleClickOpen = () => {
      setTraining({
        date: params.data.date,
        activity: params.data.activity,
        duration: params.data.duration,
        customer: params.data.customer,
      })
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave= () => {
    editTraining(training, params.value);
    setOpen(false);
  };

  const inputChanged=(event)=>{
      setTraining({...training, [event.target.name]: event.target.value});
  }

  return (
    <div>
      <IconButton variant="outlined" onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Training</DialogTitle>
        <DialogContent>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                 variant="standard"
                onChange={date => handleDateChange(date)}
                 label='Date'
                name ="date"
                value={training.date = selectedDate.toISOString()} 
             />
        </MuiPickersUtilsProvider>
          <TextField
            margin="dense"
            name='duration'
            value={training.duration}
            onChange={inputChanged}
            label="Duration"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name='activity'
            value={training.activity}
            onChange={inputChanged}
            label="Activity"
            fullWidth
            variant="standard"
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}