// dependencies
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
// material UI
import { Button, Paper, TextField } from '@material-ui/core/';
// scss
import '../../styles/palette.scss';

export const SignUp = props => {
    // state declarations
    const [email, setEmail] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [message, setMessage] = useState('');
    const [password, setPassword] = useState('');
    const [profileUrl, setProfileUrl] = useState('');
    // effect hook
    useEffect(() => {
        setMessage('')
    }, [email, firstname, lastname, password, profileUrl])
    // event handlers
    const handleSubmit = e => {
        e.preventDefault();
        console.log('submitting')
        // send user data to server
        fetch(`${process.env.REACT_APP_SERVER_URL}/auth/signup`, {
            method: 'POST',
            body: JSON.stringify({
                firstname,
                lastname,
                email,
                password,
                profileUrl
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (!res.ok) {
                console.log(res)
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
    }

    if (props.user) {
        return <Redirect to='/profile' />
    }

    return (
        <div className='sign-up'>
            <Paper className='auth-box'>
                <form className='auth-form' autoComplete='off' onSubmit={handleSubmit}>
                    <TextField className='auth-input' helperText='firstname' name='firstname' onChange={e => setFirstname = e.target.value}/>
                    <TextField className='auth-input' helperText='lastname' name='lastname' onChange={e => setLastname = e.target.value} />
                    <TextField className='auth-input' helperText='email' name='email' onChange={e => setEmail = e.target.value} />
                    <TextField className='auth-input' type='password' helperText='password' name='password' onChange={e => setPassword = e.target.value} />
                    <br />
                    <Button className='auth-button' type='submit' color='primary'>Sign Up</Button>
                </form>
            </Paper>
        </div>
    )
};