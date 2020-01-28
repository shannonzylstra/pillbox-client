// dependencies
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

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
            
        </div>
    )
};