// dependencies
import React from 'react';
// components
import { PillboxColumn } from './PillboxColumn';
// material ui
import Paper from '@material-ui/core/Paper';
// scss
import './style.scss';

export const Pillbox = () => {

    return (
        <div className='pillbox'>
            <Paper className='pillbox-display'>
                <div className='pillbox-display-column'>
                    <div className='pillbox-display-column-header'>
                    </div>
                    <div className='pillbox-display-column-box'>
                        <h2>AM</h2>
                    </div>
                    <div className='pillbox-display-column-box'>
                        <h2>PM</h2>
                    </div>
                    <div className='pillbox-display-column-box'>
                        <h2>Evening</h2>
                    </div>
                    <div className='pillbox-display-column-box'>    
                        <h2>Night</h2>
                    </div>
                </div>
                <PillboxColumn day='Mon' />
                <PillboxColumn day='Tue' />
                <PillboxColumn day='Wed' />
                <PillboxColumn day='Thu' />
                <PillboxColumn day='Fri' />
                <PillboxColumn day='Sat' />
                <PillboxColumn day='Sun' />
            </Paper>
        </div>
    )
};