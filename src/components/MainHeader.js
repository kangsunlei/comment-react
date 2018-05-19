import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

export default class MainHeader extends Component {
    static contextTypes = {
        dispatch: PropTypes.func,
        location: PropTypes.object
    };

    render() {
        return (
            <div className="main-header">
                <AppBar position="static">
                    <Toolbar>
                        <Typography type="title" color="inherit" className="title">
                            Comment App
                        </Typography>
                        <Button variant="raised" className="login-btn" href="/login" color="primary">Login</Button>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}