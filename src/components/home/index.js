// dependencies
import React from 'react';
// material ui
import { Button, TextField } from '@material-ui/core';
// scss
import './style.scss';
// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPills } from '@fortawesome/free-solid-svg-icons';

export const Home = () => {
    return (
        <div className='home'>
            <div className='home-left'>
                <FontAwesomeIcon icon={faPills} size='2x' />
                <h1>PillBox</h1>
            </div>
            <div className='home-right'>
                <div className='home-right-signin'>
                    <TextField variant='outlined' helperText='email' />
                    <TextField variant='outlined' helperText='password' type='password' />
                    <Button variant='contained' color='primary'>Sign In</Button>
                </div>
                <div className='home-right-body'>
                    <h1>Take control of your health</h1>
                    <h2>Helpful | Healthy | Happy</h2>
                    <div className='home-right-body-btns'>
                        <Button className='home-body-btns' variant='contained' color='primary' href='/signup'>Sign Up</Button>
                        <Button className='home-body-btns' variant='contained' color='primary' href='/signin'>Sign In</Button>
                    </div>
                </div>
                <div className='home-right-footer'>
                    <h4>All rights reserved PillBox 2020</h4>
                </div>
            </div>
        </div>
    )
};