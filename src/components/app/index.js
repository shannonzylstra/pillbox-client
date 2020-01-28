// dependencies
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
// components
import { SignIn, SignUp } from '../auth';
// css
import './style.css';

export const App = () => {
    const [user, setUser] = useState(null);
    // effect hook
    useEffect(() => {
        decodeToken()
    }, []);
    // helper functions
    const updateUser = newToken => {
        if (newToken) {
            // token to localStorage
            localStorage.setItem('mernToken', newToken);
            decodeToken(newToken);
        } else {
            setUser(null);
        }
    };

    const decodeToken = existingToken => {
        let token = existingToken || localStorage.getItem('mernToken');
        if (token) {
            let decoded = jwtDecode(token)
            // if !token or not decodable, not logged in
            if (!decoded || Date.now() >= decoded.exp * 1000) {
                console.log('expired');
                setUser(null);
            } else {
                setUser(decoded);
            }
        } else {
            setUser(null);
        }
    };

    return (
        <Router>
            <div className='app'>
            </div>
        </Router>
    )
};