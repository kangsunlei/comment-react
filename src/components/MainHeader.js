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
                        <Button href="/" color="inherit">Home</Button>
                        <Button href="/home/star" color="inherit">stars</Button>
                        <Button href="/home/list" color="inherit">List</Button>
                        <Button href="/home/editor" color="inherit">Editor</Button>
                        <Button href="/login" color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}