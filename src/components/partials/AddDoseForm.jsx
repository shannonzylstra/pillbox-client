import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const API_URL = 'http://localhost:3004/usermedications/doses'

const NewDoseForm = props => {
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
    let [checked, setChecked] = useState(true)

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
        .then(response => response.json())
        .then(result => {
            // TODO: Refreshing the doses list
            
            // Reset the state
            setDays({})
            setName('')
            setTime('')
            setFood(false)
            setDosage('')
            setInstructions('')
            // props.resetDoses() // is this the right way to do this? I think I need a let [doses, setDoses] = useState([]) somewhere...?
        })
    }
    
    const updateCheck = (day, e) => {
        if (checked) {
            console.log(`checked is ${days[day]} but should be ${!checked}`)
            setChecked(false)
            return false
        }
        else {
            console.log(`checked is ${checked} but should be ${!checked}`)
            setChecked(true)
            return true
        }
    }

    const updateDay = (day, e) => {
        let tempDays = {...days}
        tempDays[day] = updateCheck(day, e)
        setDays(tempDays)
    }

    return (
        <div className="card dose-form col s6">
            <h2>Add New Dose</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="days">Days:</label>
                    <input type="checkbox" id="M" name="days" onChange={e => updateDay('M', e)} checked={days.M} />
                    <input type="checkbox" id="T" name="days" onChange={e => updateDay('T', e)} checked={days.T} />
                    <input type="checkbox" id="W" name="days" onChange={e => updateDay('W', e)} checked={days.W} />
                    <input type="checkbox" id="Th" name="days" onChange={e => updateDay('Th', e)} checked={days.Th} />
                    <input type="checkbox" id="F" name="days" onChange={e => updateDay('F', e)} checked={days.F} />
                    <input type="checkbox" id="Sa" name="days" onChange={e => updateDay('Sa', e)} checked={days.Sa} />
                    <input type="checkbox" id="S" name="days" onChange={e => updateDay('S', e)} checked={days.S} />
                </div>
                <div>
                    <label>Name:</label>
                    <input name="name" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div>
                    <label>Time:</label>
                    <input name="time" value={time} onChange={e => setTime(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="food">Food:</label>
                    <input type="checkbox" id="food" name="food" onChange={e => setFood(e.target.checked)} />
                </div>
                <div>
                    <label>Dosage:</label>
                    <input name="dosage" value={dosage} onChange={e => setDosage(e.target.value)} />
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
                <br />
                <div>
                    <Button type="submit" variant="contained" color="primary">Add Dose</Button>
                </div>
            </form>
        </div>
    )
}

export default NewDoseForm