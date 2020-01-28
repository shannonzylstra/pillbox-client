// dependencies
import React, { useState } from 'react';

export const SignUp = () => {
    // state declarations
    const [email, setEmail] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [message, setMessage] = useState('');
    const [password, setPassword] = useState('');
    const [profileUrl, setProfileUrl] = useState('');

    // event handlers
    const handleSubmit = e => {
        e.preventDefault();
    }

    return (
        <div className='sign-up'>
        </div>
    )
};