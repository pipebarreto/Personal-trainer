import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {
    DatePicker,
    MuiPickersUtilsProvider,
  } from '@material-ui/pickers';
  import DateFnsUtils from '@date-io/date-fns'; 
  import {useState, useRef} from 'react';
  import AddIcon from '@mui/icons-material/Add';

export default function AddTraining({ addTraining}) {
  const [open, setOpen] = React.useState(false);
  const [selectedDate, handleDateChange] = useState(new Date());
  const[training, setTraining]=React.useState({
      date:'',
      activity:'',
      duration: '',
      customer: '',
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave= () => {
    addTraining(training);
    setOpen(false);
  };

  const inputChanged=(event)=>{
      setTraining({...training, [event.target.name]: event.target.value});
  }

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}
      endIcon ={<AddIcon />}>
        New Training
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Training</DialogTitle>
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
            name='activity'
            value={training.activity}
            onChange={inputChanged}
            label="Activity"
            fullWidth
            variant="standard"
          />
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
            name='customer'
            field={training.customer}
            onChange={inputChanged}
            label="Customer's Link"
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