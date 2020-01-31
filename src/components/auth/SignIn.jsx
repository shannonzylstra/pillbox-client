// dependencies
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPills } from '@fortawesome/free-solid-svg-icons';
// material ui
import { Button, TextField }from '@material-ui/core';

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
        <div className='auth'>
            <div className='auth-left'>
                <FontAwesomeIcon icon={faPills} size='2x' />
                <h1>PillBox</h1>
            </div>
            <div className='auth-right'>

                <h1>Create your account</h1>
                <div className='signin-form'>
                    <TextField variant='outlined' placeholder='email' onChange={e => setEmail(e.target.value)} />
                    <TextField variant='outlined' placeholder='password' type='password' onChange={e => setPassword(e.target.value)} />
                    <div className='auth-btn-cont'>
                        <Button variant='contained' color='primary' onClick={handleSubmit}>Sign Up</Button> 
                    </div>
                </div>
            </div>
        </div>
    )
};