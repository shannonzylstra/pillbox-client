import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';

const API_URL = 'http://localhost:3004/usermedications/doses'

const NewDoseForm = props => {
    let [days, setDays] = useState({})
    let [name, setName] = useState('')
    let [time, setTime] = useState('')
    let [food, setFood] = useState(false)
    let [dosage, setDosage] = useState('')
    let [instructions, setInstructions] = useState('')

    const handleSubmit = e => {
        e.preventDefault()
        console.log('Submitted the form', {days, name, time, food, dosage, instructions})
        
        // TODO: figure out if I need to include createdAt, _id, etc.
        // Form the data
        let data = {
            medication: '5e3092af0c10301b2bf7c791',
            days,
            name,
            time,
            food,
            dosage,
            instructions
        }

        // Call the API
        fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
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
    
    const updateDay = (day, e) => {
        let tempDays = {...days}
        tempDays[day] = e.target.checked
        setDays(tempDays)
    }

    return (
        <div className="card dose-form col s6">
            <h2>Add New Dose</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label for="days">Days:</label>
                    <input type="checkbox" id="M" name="days" onChange={e => updateDay('M', e)} />
                    <input type="checkbox" id="T" name="days" onChange={e => updateDay('T', e)} />
                    <input type="checkbox" id="W" name="days" onChange={e => updateDay('W', e)} />
                    <input type="checkbox" id="Th" name="days" onChange={e => updateDay('Th', e)} />
                    <input type="checkbox" id="F" name="days" onChange={e => updateDay('F', e)} />
                    <input type="checkbox" id="Sa" name="days" onChange={e => updateDay('Sa', e)} />
                    <input type="checkbox" id="S" name="days" onChange={e => updateDay('S', e)} />
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
                    <label for="food">Food:</label>
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
                <div>
                    <input type="submit" />
                </div>
            </form>
        </div>
    )
}

export default NewDoseForm