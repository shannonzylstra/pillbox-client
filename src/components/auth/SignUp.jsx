// dependencies
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
// material UI
import { Button, TextField } from '@material-ui/core/';
// scss
import '../../styles/palette.scss';
// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPills } from '@fortawesome/free-solid-svg-icons';

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
        <div className='auth'>
            <div className='auth-left'>
                <FontAwesomeIcon icon={faPills} size='2x' />
                <h1>PillBox</h1>
            </div>
            <div className='auth-right'>

                <h1>Create your account</h1>
                <div className='signup-form'>
                    <TextField className='auth-input' variant='outlined' placeholder='first name' onChange={e => setFirstname(e.target.value)}/>
                    <TextField className='auth-input' variant='outlined' placeholder='last name' onChange={e => setLastname(e.target.value)} />
                    <TextField className='auth-input' variant='outlined' placeholder='email' onChange={e => setEmail(e.target.value)} />
                    <TextField className='auth-input' variant='outlined' placeholder='password' type='password' onChange={e => setPassword(e.target.value)} />
                    <div className='auth-btn-cont'>
                        <Button variant='contained' color='primary' onClick={handleSubmit}>Sign Up</Button> 
                    </div>
                </div>
            </div>
        </div>
    )
};