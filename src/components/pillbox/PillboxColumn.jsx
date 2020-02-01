// dependencies
import React, { useEffect } from 'react';

export const PillboxColumn = props => {
    
    let am = [];
    let pm = [];
    let eve = [];
    let bed = [];
    let morning;

    useEffect(() => {
        populateData();
    })

    const populateData = () => {
        if (props.data.length > 0) {
            props.data.map((d, i) => {
                if (d.times.includes('am')) {
                    console.log(d)
                    am.push(d);
                } else if (d.times.includes('pm')) {
                    pm.push(d);
                } else if (d.times.includes('eve')) {
                    eve.push(d);
                } else if (d.times.includes('bed')) {
                    bed.push(d);
                }
            })
        }
    }

    if (am.length > 0) {
        morning = am.map((med, i) => {
            console.log(med)
            return (
                <div className='am' key={i}>
                    <p>{med.name}</p>
                </div>
            )
        })
    } else {
        morning = <p>-</p>
    }

    

    return (
        <div className='pillbox-display-column'>
            <div className='pillbox-display-column-header'>
                <h1>{props.day}</h1>
            </div>
            <div className='pillbox-display-column-box'>
                {morning}
            </div>
            <div className='pillbox-display-column-box'>

            </div>
            <div className='pillbox-display-column-box'>

            </div>
            <div className='pillbox-display-column-box'>

            </div>
        </div>
    )
};