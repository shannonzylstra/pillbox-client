// dependencies
import React from 'react';
// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faCoffee, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

export const PillboxLabel = () => {
    return (
        <div className='pillbox-label'>
            <div className='pillbox-display-column-header'></div>
            <div className='pillbox-display-column-box'>
                <FontAwesomeIcon icon={faCoffee} size='2x' />
            </div>
            <div className='pillbox-display-column-box'>
                <FontAwesomeIcon icon={faSun} size='2x' />
            </div>
            <div className='pillbox-display-column-box'>
                <FontAwesomeIcon icon={faMoon} size='2x' />
            </div>
            <div className='pillbox-display-column-box'>
                <FontAwesomeIcon icon={faBed} size='2x' />
            </div>
        </div>
    )
};