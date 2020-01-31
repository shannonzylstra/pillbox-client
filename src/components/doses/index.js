// dependencies
import React from 'react';
// material ui
import { Button, TextField } from '@material-ui/core';
// scss
import './style.scss';
// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPills } from '@fortawesome/free-solid-svg-icons';
import AddDoseDialogue from '../partials/AddDoseDialogue';
// import AddDoseForm from '../partials/AddDoseForm';

export const Doses = () => {
    return (
        <div className="doses">
            <AddDoseDialogue />
        </div>
    )
}