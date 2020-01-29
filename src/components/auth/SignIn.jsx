// dependencies
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
// material ui
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

export const SignIn = props => {
    
    // state declarations
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        setMessage('')
    }, [email, password]);
    
    // event handlers
    const handleSubmit = e => {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_SERVER_URL}/auth/login`, {
            method: 'POST',
            body: JSON.stringify({
                email,
                password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (!res.ok) {
                setMessage(`${res.status}: ${res.statusText}`)
                return
            }
            res.json()
            .then(res => {
                props.updateUser(res.token)
            })
        })
        .catch(err => {
            console.log(err)
            setMessage(`${err.toString()}`)
        })
    };

    if (props.user) {
        return <Redirect to='/profile' />
    }

    return (
        <div className='sign-in'>
            <Paper className='auth-box'>
                <form className='auth-form' autoComplete='off' onSubmit={handleSubmit}>
                    <TextField className='auth-input' helperText='email' name='email' onChange={e => setEmail(e.target.value)} />
                    <TextField className='auth-input' type='password' helperText='password' name='password' onChange={e => setPassword(e.target.value)} />
                    <br />
                    <Button className='auth-button' type='submit' color='primary'>Sign Up</Button>
                </form>
            </Paper>
        </div>
    )
};