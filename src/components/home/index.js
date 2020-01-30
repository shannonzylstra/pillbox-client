// dependencies
import React from 'react';
import Button from '@material-ui/core/Button';
import AddDoseForm from '../partials/AddDoseForm';

export const Home = () => {
    return (
        <div className='home'>
            <Button variant="contained" color="primary">Hello World!</Button>
            <AddDoseForm></AddDoseForm>
        </div>
    )
};