// dependencies
import React, { useEffect, useState } from 'react';
// Styling
import { makeStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
// Material UI
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

// scss
import './style.scss';

// custom components
import AddMedModal from '../partials/AddMedModal'

// Set up styling
const useStyles = makeStyles(theme => ({
    blueAvatar: {
      color: blue[600],
      backgroundColor: blue[100],
    },
    blue: {
      color: blue[600],
      paddingLeft: '5px'
    },
    red: {
      color: '#f00'
    },
    row: {
      textAlign: 'center'
    },
    spacer: {
      padding: '0 25px'
    },
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 500,
    },
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    }
  }))

export const Profile = () => {
    const classes = useStyles()
    let [user, setUser] = useState({})

    const handleSubmit = () => {
        return
    }

    // Implement useEffect to fetch the user's data
    useEffect(() => {
        let token = localStorage.getItem('mernToken')
        fetch(`${process.env.REACT_APP_SERVER_URL}/user`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
        })
        .then(response => response.json())
        .then(result => {
            console.log('successfully grabbed user:', result)
            setUser(result.user)
        })
        .catch(err => {
            console.log('err', err)
        })
    }, [])
  
    return (
        <div className='profile'>
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <Typography gutterBottom variant="h2">
                        {user.firstname}'s Profile
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item>
                            <img className={classes.img} alt="Profile Photo" src="http://placekitten.com/200/200"></img>
                            <Typography gutterBottom variant="subtitle1">
                                {user.firstname} {user.lastname}
                            </Typography>
                            <Typography gutterBottom variant="body">
                                {user.email}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>
                                    <Button variant="outlined" onSubmit={handleSubmit}>
                                        <Avatar className={classes.blueAvatar}>
                                        <EditIcon />
                                        </Avatar>
                                        <span className={classes.blue}>Manage Medications</span>
                                    </Button>
                                </Grid>
                                <Grid item xs>
                                    <AddMedModal />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        </div>
    )
};