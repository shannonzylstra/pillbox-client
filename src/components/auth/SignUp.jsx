// dependencies
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
// material UI
import { Paper, TextField } from '@material-ui/core/';

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
                <form className='auth-form' noValidate autoComplete='off'>
                    <TextField className='auth-input' helperText='email' />
                    <TextField className='auth-input' type='password' helperText='password' />
                </form>
            </Paper>
        </div>
    )
};