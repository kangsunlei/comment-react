import React, { Component } from 'react';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import Visibility from 'material-ui-icons/Visibility';
import VisibilityOff from 'material-ui-icons/VisibilityOff';
import Tabs, { Tab } from 'material-ui/Tabs';

import { ajax } from '../core/common';

import '../css/login.css';

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            password: '',
            password2: '',
            showPassword: false,
            showPassword2: false,
            formError: '',
            activeTab: 0
        };
    }

    handleChange = prop => event => {
        this.setState({
            formError: '',
            [prop]: event.target.value
        });
    };

    handleMouseDownPassword = event => {
        event.preventDefault();
    };

    handleClickShowPasssword = (n) => {
        this.setState({ [`showPassword${n}`]: !this.state.showPassword });
    };

    handleTabChange = (event, activeTab) => {
        this.setState({
            activeTab,
            formError: ''
        });
    };

    handleAction = (type) => {
        const { name, password, password2 } = this.state;
        const { history } = this.props;
        if (type === 'register' && password !== password2) {
            this.setState({
                formError: '两次密码不一致!'
            });
            return;
        }
        if(name && password) {
            ajax({
                url: `/auth/${type}`,
                method: 'post',
                data: { name, password }
            }).then(res => {
                if(res && res.success) {
                    history.replace('/home');
                } else {
                    this.setState({
                        formError: res ? res.msg : 'error'
                    });
                }
            });
        } else {
            this.setState({
                formError: '用户名或密码不能为空！'
            });
        }
        
    }

    renderForm = (type) => {
        const { name, showPassword, showPassword2, password, password2, formError } = this.state;
        return <div className="login-wrapper">
            <FormControl className="form-control">
                <InputLabel htmlFor="name">Name</InputLabel>
                <Input
                    id="name"
                    value={name}
                    onChange={this.handleChange('name')}
                />
            </FormControl>
            <FormControl className="form-control">
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={this.handleChange('password')}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                onClick={this.handleClickShowPasssword}
                                onMouseDown={this.handleMouseDownPassword}
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
            { type === 'register' &&
            <FormControl className="form-control">
                <InputLabel htmlFor="password2">Password again</InputLabel>
                <Input
                    id="password2"
                    type={showPassword2 ? 'text' : 'password'}
                    value={password2}
                    onChange={this.handleChange('password2')}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                onClick={() => this.handleClickShowPasssword(2)}
                                onMouseDown={this.handleMouseDownPassword}
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
            }
            <div className="error">
                {formError}
            </div>
            <Button
                raised
                dense
                className="btn"
                color="primary"
                onClick={() => this.handleAction(type)}
            >{type === 'login' ? '登录' : '注册'}</Button>
        </div>;
    }

    render() {
        const { activeTab } = this.state;
        return(
            <div className="main login">
                <div className="login-tab-wrapper">
                    <Tabs
                        value={activeTab}
                        onChange={this.handleTabChange}
                        indicatorColor="primary"
                        textColor="primary"
                    >
                        <Tab label="登录" />
                        <Tab label="注册" />
                    </Tabs>
                    {activeTab === 0 && this.renderForm('login')}
                    {activeTab === 1 && this.renderForm('register')}
                </div>
            </div>
        );
    }
}