import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

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
                            Title
                        </Typography>
                        <Button color="contrast">Login</Button>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}