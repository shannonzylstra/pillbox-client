import React, { useState } from 'react'
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
// For checkbox
import Checkbox from '@material-ui/core/Checkbox';
// For time picker; utter failure.
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const API_URL = 'http://localhost:3004/usermedications/doses'

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(1),
        // width: theme.spacing(16),
        // height: theme.spacing(16),
      },
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
  }));

const NewDoseForm = props => {
    const classes = useStyles()

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
    // let [time, setTime] = useState('')
    let [time, setTime] = useState('')
    let [food, setFood] = useState(false)
    let [dosage, setDosage] = useState('')
    let [instructions, setInstructions] = useState('')
    const [value, setValue] = useState('female');

    // For time picker; utter failure.
    const [selectedDate, setSelectedDate] = useState(new Date('2014-08-18T21:11:54'));

    // For checkbox
    let [checked, setChecked] = useState(true)

    const handleDateChange = date => {
      setSelectedDate(date);
    };    


    const handleChange = event => {
        setValue(event.target.value);
    };

    const handleNameChange = e => {
        setName(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault()

        // zoloft = 5e3237fff189414cda737696

        // Form the data
        let data = {
            medication: '5e3237fff189414cda737696',
            days,
            name,
            time,
            food,
            dosage,
            instructions
        }

        console.log('Submitting the form', data)

        // Call the API
        let token = localStorage.getItem('mernToken')
        fetch(`${process.env.REACT_APP_SERVER_URL}/usermedications/doses/`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            console.log(response)
            response.json().then(result => {
                // TODO: Refreshing the doses list
                console.log(result)
                // Reset the state
                setDays({
                    M: true,
                    T: true,
                    W: true,
                    Th: true,
                    F: true,
                    Sa: true,
                    S: true
                })
                setName('')
                setTime('')
                setFood(false)
                setDosage('')
                setInstructions('')
                // props.resetDoses() // is this the right way to do this? I think I need a let [doses, setDoses] = useState([]) somewhere...?
             })
        })
    }
 
    const updateDay = (day, e) => {
        let tempDays = {...days}
        tempDays[day] = e.target.checked
        setDays(tempDays)
    }

    const handleTimeChange = time => {
        setTime(time)
    };

    return (
        <div className={classes.root}>
            <div className="dose-form col s6">
            <Paper variant="outlined">
                <h2>Add New Dose</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        {/* <label htmlFor="days">Days:</label>
                        <input type="checkbox" id="M" name="days" onChange={e => updateDay('M', e)} checked={days.M} />
                        <input type="checkbox" id="T" name="days" onChange={e => updateDay('T', e)} checked={days.T} />
                        <input type="checkbox" id="W" name="days" onChange={e => updateDay('W', e)} checked={days.W} />
                        <input type="checkbox" id="Th" name="days" onChange={e => updateDay('Th', e)} checked={days.Th} />
                        <input type="checkbox" id="F" name="days" onChange={e => updateDay('F', e)} checked={days.F} />
                        <input type="checkbox" id="Sa" name="days" onChange={e => updateDay('Sa', e)} checked={days.Sa} />
                        <input type="checkbox" id="S" name="days" onChange={e => updateDay('S', e)} checked={days.S} /> */}
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
                    </div>
                    <div>
                        {/* <FormControl className={classes.formControl}> */}
                        <Select value={name} onChange={handleNameChange} displayEmpty className={classes.selectEmpty}>
                            <MenuItem value="" disabled>
                                When
                            </MenuItem>
                            <MenuItem value={'morning'}>Morning</MenuItem>
                            <MenuItem value={'afternoon'}>Afternoon</MenuItem>
                            <MenuItem value={'evening'}>Evening</MenuItem>
                            <MenuItem value={'bedtime'}>Bedtime</MenuItem>
                            <MenuItem value={'an'}>As Needed</MenuItem>
                        </Select>
                            {/* <FormHelperText>Morning</FormHelperText> */}
                        {/* </FormControl> */}
                        {/* <RadioGroup aria-label="position" name="position" value={value} onChange={handleChange} row>
                            <FormControlLabel
                                value="bottom"
                                control={<Radio color="primary" />}
                                label="Bottom"
                                labelPlacement="bottom"
                            />
                            <FormControlLabel
                                value="bottom"
                                control={<Radio color="primary" />}
                                label="Bottom"
                                labelPlacement="bottom"
                            />
                            <FormControlLabel
                                value="bottom"
                                control={<Radio color="primary" />}
                                label="Bottom"
                                labelPlacement="bottom"
                            />
                            <FormControlLabel
                                value="bottom"
                                control={<Radio color="primary" />}
                                label="Bottom"
                                labelPlacement="bottom"
                            />
                            <FormControlLabel
                                value="bottom"
                                control={<Radio color="primary" />}
                                label="Bottom"
                                labelPlacement="bottom"
                            />
                        </RadioGroup> */}
                        {/* <input name="time" value={time} onChange={e => setTime(e.target.value)} /> */}
                        {/* <TextField id="time" name="time" value={time} onChange={e => setTime(e.target.value)} label="Time" /> */}
                        {/* <label htmlFor="food">Food:</label>
                        <input type="checkbox" id="food" name="food" onChange={e => setFood(e.target.checked)} /> */}
                    </div>
                    <div>
                        {/* <label>Dosage:</label>
                        <input name="dosage" value={dosage} onChange={e => setDosage(e.target.value)} /> */}
                        <TextField id="dosage" name="dosage" value={dosage} onChange={e => setDosage(e.target.value)} label="Dosage" />
                    </div>
                    <div>
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
                    </div>
                    <br />
                    <div>
                        <TextField
                            id="instructions"
                            label="Instructions:"
                            multiline
                            rows="4"
                            defaultValue="Rx"
                            variant="outlined"
                        />
                    </div>
                    {/* <div>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid container justify="space-around">
                                <KeyboardTimePicker
                                margin="normal"
                                id="time-picker"
                                label="Time picker"
                                value={selectedDate}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                }}
                                />
                            </Grid>
                        </MuiPickersUtilsProvider>
                    </div> */}
                    <br />
                    <div>
                        <Button type="submit" variant="contained" color="primary">Add Dose</Button>
                    </div>
                </form>
            </Paper>
            </div>
        </div>
    )
}

export default NewDoseForm