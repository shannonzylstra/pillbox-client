// dependencies
import React, { useState } from 'react';

export const SignIn = () => {
    
    // state declarations
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [password, setPassword] = useState('');
    
    // event handlers
    const handleSubmit = e => {
        e.preventDefault();
    };

    return (
        <div className='sign-in'>
            
        </div>
    )
};