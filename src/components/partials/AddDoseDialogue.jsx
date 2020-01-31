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
import { FormControlLabel } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';

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
    let [medication, setMedication] = useState('')
    let [days, setDays] = useState({
        M: true,
        T: true,
        W: true,
        Th: true,
        F: true,
        Sa: true,
        S: true
    })
    let [name, setName] = useState('')
    let [time, setTime] = useState('')
    let [food, setFood] = useState(false)
    let [dosage, setDosage] = useState('')
    let [instructions, setInstructions] = useState('')

    useEffect(() => {
        setError('')
    }, [medication, days, name, time, food, dosage, instructions])

    const handleClose = () => close()

    const handleSubmit = (e) => {
        e.preventDefault()

        let data = {
            medication,
            days,
            name,
            time,
            food,
            dosage,
            instructions
        }

        console.log(data)

        if (!medication || !name || !dosage) {
            setError('Provide a medication, when to take it, and a dosage')
            return
        }

        let token = localStorage.getItem('mernToken')
        fetch(`${process.env.REACT_APP_SERVER_URL}/usermedications/doses`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`

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

    const updateDay = (day, e) => {
        let tempDays = {...days}
        tempDays[day] = e.target.checked
        setDays(tempDays)
    }

    const handleNameChange = e => {
        setName(e.target.value)
    }

    return (
        <Dialog onClose={handleClose} aria-labelledby="dialog-title" open={open}>
            <DialogTitle id="dialog-title">Add Dose</DialogTitle>
            <p className={classes.red}>{error}</p>
            <form onSubmit={handleSubmit}>
                <div>
                <FormControl>
                    <Autocomplete
                        id="combo-box" 
                        onChange={(event, value) => setMedication(value ? value : '')} 
                        options={props.medications}
                        getOptionsLabel={option => `${option.brand} (${option.generic})`} 
                        style={{ width: 500 }} 
                        renderInput={params => (
                            <TextField {...params} label="Your Medications" variant="outlined" fullWidth />
                        )}
                    />
                </FormControl>
                    <FormControl fullWidth>
                        <FormControlLabel
                            labelPlacement="bottom"
                            label="M"
                            control={
                                <Checkbox
                                    id="M"
                                    name="days"
                                    checked={days.M}
                                    onChange={e => updateDay('M', e)}
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                    label="M"
                                />
                            }   
                        />
                        <FormControlLabel
                            labelPlacement="bottom"
                            label="T"
                            control={
                                <Checkbox
                                    id="T"
                                    name="days"
                                    checked={days.T}
                                    onChange={e => updateDay('T', e)}
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                    label="T"
                                />
                            }
                        />
                        <FormControlLabel
                            labelPlacement="bottom"
                            label="W"
                            control={
                                <Checkbox
                                    id="W"
                                    name="days"
                                    checked={days.W}
                                    onChange={e => updateDay('W', e)}
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                    label="W"
                                />
                            }
                        />
                        <FormControlLabel
                            labelPlacement="bottom"
                            label="Th"
                            control={
                                <Checkbox
                                    id="Th"
                                    name="days"
                                    checked={days.Th}
                                    onChange={e => updateDay('Th', e)}
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                    label="Th"
                                />
                            }
                        />
                        <FormControlLabel
                            labelPlacement="bottom"
                            label="F"
                            control={
                                <Checkbox
                                    id="F"
                                    name="days"
                                    checked={days.F}
                                    onChange={e => updateDay('F', e)}
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                    label="F"
                                />
                            }
                        />                        
                        <FormControlLabel
                            labelPlacement="bottom"
                            label="Sa"
                            control={
                                <Checkbox
                                    id="Sa"
                                    name="days"
                                    checked={days.Sa}
                                    onChange={e => updateDay('Sa', e)}
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                    label="Sa"
                                />
                            }
                        />
                        <FormControlLabel
                            labelPlacement="bottom"
                            label="S"
                            control={
                                <Checkbox
                                    id="S"
                                    name="days"
                                    checked={days.S}
                                    onChange={e => updateDay('S', e)}
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                    label="S"
                                />
                            }
                        />
                    </FormControl>
                    {/* <FormControl fullWidth>
                        <InputLabel htmlFor="component-outlined">Condition</InputLabel>
                        <OutlinedInput id="component-outlined" value={condition} onChange={(e) => setCondition(e.target.value)} label="Condition" fullWidth />
                    </FormControl> */}
                    <FormControl fullWidth>
                        <Select value={name} onChange={handleNameChange} displayEmpty className={classes.selectEmpty} fullWidth>
                            <MenuItem value="" disabled>
                                When
                            </MenuItem>
                            <MenuItem value={'morning'}>Morning</MenuItem>
                            <MenuItem value={'afternoon'}>Afternoon</MenuItem>
                            <MenuItem value={'evening'}>Evening</MenuItem>
                            <MenuItem value={'bedtime'}>Bedtime</MenuItem>
                            <MenuItem value={'an'}>As Needed</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <TextField id="dosage" name="dosage" value={dosage} onChange={e => setDosage(e.target.value)} label="Dosage" fullWidth  />
                    </FormControl>
                    <FormControl fullWidth>
                        <FormControlLabel
                            // labelPlacement="start"
                            label="Food"
                            control={
                                <Checkbox
                                    id="food"
                                    name="food"
                                    checked={food}
                                    onChange={e => setFood(e.target.checked)}
                                    value="food"
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                    label="Food"
                                />
                            }
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <TextField
                            id="instructions" 
                            name="instructions" 
                            value={instructions} 
                            onChange={e => setInstructions(e.target.value)}
                            label="Instructions:"
                            multiline
                            rows="4"
                            // defaultValue="Rx"
                            variant="outlined"
                        />
                    </FormControl>
                </div>
                <FormControl>
                    <div className={classes.row}>
                    <Button type="submit" variant="contained" color="primary" className={classes.spacer}>
                        <AddCircleIcon />
                        Add Dose
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

export default function AddDoseDialogue() {
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
        fetch(`${process.env.REACT_APP_SERVER_URL}/usermedications`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(result => {
            console.log(result)
            let meds = []
            result.usermedications.forEach(med => {
                meds.push(med.brand)
            })
            setMedications(meds)
        })
        .catch(err => {
            console.log('err', err)
        })
    }, [])

    return (
        <div>
            <Button variant="outline" onClick={handleClickOpen}>
                <Avatar className={classes.blueAvatar}>
                    <AddIcon />
                </Avatar>
                <span className={classes.blue}>Add Dose</span>
            </Button>
            <SimpleDialog open={open} close={handleClose} medications={medications} />
        </div>
    )
}