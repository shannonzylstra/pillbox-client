// dependencies
import React from 'react';
// components
import { PillboxColumn } from './PillboxColumn';
import { PillboxLabel } from './PillboxLabel';
// material ui
import Paper from '@material-ui/core/Paper';
// scss
import './style.scss';

export const Pillbox = () => {

    return (
        <div className='pillbox'>
            <Paper className='pillbox-display'>
                <PillboxLabel />
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