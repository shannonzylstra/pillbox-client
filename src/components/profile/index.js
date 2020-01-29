// dependencies
import React from 'react';

// scss
import './style.scss';

// custom components
import AddMedModal from '../partials/AddMedModal'

export const Profile = () => {
    return (
        <div className='profile'>
            <p>Profile</p>
            <AddMedModal />
        </div>
    )
};