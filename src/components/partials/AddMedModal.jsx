import React, { useEffect, useState } from 'react';
// Styling
import { makeStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
// Material UI Components
import AddIcon from '@material-ui/icons/Add';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CancelIcon from '@material-ui/icons/Cancel';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import TextField from '@material-ui/core/TextField';

// Set up styling
const useStyles = makeStyles(theme => ({
  blueAvatar: {
    color: blue[600],
    backgroundColor: blue[100],
  },
  blue: {
    color: blue[600],
    paddingLeft: '5px'
  },
  red: {
    color: '#f00'
  },
  row: {
    textAlign: 'center'
  },
  spacer: {
    padding: '0 25px'
  }
}))

function SimpleDialog(props) {
  const classes = useStyles()
  const { close, open } = props
  let [error, setError] = useState('')
  let [condition, setCondition] = useState('')
  let [medication, setMedication] = useState('')

  useEffect(() => {
    setError('')
  }, [condition, medication])

  const handleClose = () => close()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!medication || !condition) {
      setError('Provide both an error and a medication')
      return
    }

    let token = localStorage.getItem('mernToken')
    fetch(`${process.env.REACT_APP_SERVER_URL}/usermedications`, {
      method: 'POST',
      body: JSON.stringify({
        medication,
        condition
      }),
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      response.json().then(result => {
        if (response.ok) {
          close() 
        }
        else {
          setError(`${response.status} ${response.statusText}: ${result.message}`)
        }
      })
      
    })
    .catch(err => {
      setError(err)
    })
  }

  return (
    <Dialog onClose={handleClose} aria-labelledby="dialog-title" open={open}>
      <DialogTitle id="dialog-title">Medication Quick Add</DialogTitle>
      <p className={classes.red}>{error}</p>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <Autocomplete
            id="combo-box"
            onChange={(event, value) => setMedication(value ? value._id : '')}
            options={props.medications}
            getOptionLabel={option => `${option.brand} (${option.generic})`}
            style={{ width: 300 }}
            renderInput={params => (
                <TextField {...params} label="Available Meds" variant="outlined" fullWidth />
            )}
            />
          </FormControl>
          <div>
            <FormControl fullWidth>
              <InputLabel htmlFor="component-outlined">Condition</InputLabel>
              <OutlinedInput id="component-outlined" value={condition} onChange={(e) => setCondition(e.target.value)} label="Condition" fullWidth />
            </FormControl>
          </div>
          <FormControl>
            <div className={classes.row}>
              <Button type="submit" color="primary" className={classes.spacer}>
                <AddCircleIcon />
                Add Med
              </Button>
              <Button onClick={handleClose} color="secondary">
                <CancelIcon />
                Cancel
              </Button>
            </div>
          </FormControl>
        </form>
    </Dialog>
  )
}

export default function AddMedModal() {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const [medications, setMedications] = useState([])

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = value => {
    setOpen(false)
  }

  // Implement useEffect to fetch the actual medications
  useEffect(() => {
    let token = localStorage.getItem('mernToken')
    fetch(`${process.env.REACT_APP_SERVER_URL}/medications`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(result => {
      console.log('success', result)
      setMedications(result.medications)
    })
    .catch(err => {
      console.log('err', err)
    })
  }, [])

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        <Avatar className={classes.blueAvatar}>
          <AddIcon /> 
        </Avatar>
        <span className={classes.blue}>New Medication</span>
      </Button>
      <SimpleDialog open={open} close={handleClose} medications={medications} />
    </div>
  )
}