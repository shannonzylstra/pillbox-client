// dependencies
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
// components
import { Home } from '../home';
import { Doses } from '../doses';
import { Medication } from '../medication';
import { Meds } from '../meds';
import { Pillbox } from '../pillbox';
import { Profile } from '../profile';
import { SignIn, SignUp } from '../auth';
import Nav from '../partials/Nav'

// scss
import './style.scss';

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
            console.log(newToken)
        } else {
            setUser(null);
            console.log('nothing happening')
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

    let content;
    if (!user) {
        content = (
            <div className='content'>
                <Route exact path='/' component={Home} />

                <Route path = '/signup'
                    render={() => 
                        <SignUp updateUser={updateUser} />
                    } />

                <Route path='/signin'
                    render={() =>
                        <SignIn updateUser={updateUser} />
                    } />
            </div>
        )
    } else {
        content = (
            <div className='content'>
                <Nav updateUser={updateUser} user={user} />

                <Route exact path ='/' render={() => <Redirect to='/profile' /> } />

                <Route path='/medication' component={Medication} />

                <Route path='/meds' component={Meds} />

                <Route path='/pillbox' component={Pillbox} />

                <Route path='/profile' component={Profile} />

                <Route path='/signin' render={() => <Redirect to='/profile' /> } />

                <Route path='/signup' render={() => <Redirect to='/profile' /> } />

                <Route path='/doses' render={Doses} />
            </div>
        )
    }

    return (
        <Router>
            <div className='app'>
                {content}
            </div>
        </Router>
    )
};