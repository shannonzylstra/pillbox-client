// dependencies
import React, { useState } from 'react';
// components
import { PillboxColumn } from './PillboxColumn';
import { PillboxLabel } from './PillboxLabel';
// material ui
import Paper from '@material-ui/core/Paper';
// scss
import './style.scss';

export const Pillbox = () => {
    const [mon, setMon] = useState([
        {
            name: 'Xanax',
            times: ['am', 'eve'],
            condition: 'Anxiety'
        },
        {
            name: 'Immodium',
            times: ['pm', 'eve'],
            condition: 'Bad arse'
        }
    ]);
    const [tue, setTue] = useState([]);
    const [wed, setWed] = useState([]);
    const [thu, setThu] = useState([]);
    const [fri, setFri] = useState([]);
    const [sat, setSat] = useState([]);
    const [sun, setSun] = useState([]);


    return (
        <div className='pillbox'>
            <Paper className='pillbox-display'>
                <PillboxLabel />
                <PillboxColumn day='Mon' data={mon} />
                <PillboxColumn day='Tue' data={tue} />
                <PillboxColumn day='Wed' data={wed} />
                <PillboxColumn day='Thu' data={thu} />
                <PillboxColumn day='Fri' data={fri} />
                <PillboxColumn day='Sat' data={sat} />
                <PillboxColumn day='Sun' data={sun} />
            </Paper>
        </div>
    )
};