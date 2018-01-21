import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import Main from './components/Main';
import Login from './components/Login';

import './css/index.css';

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Main} />
                <Route path="/login" component={Login} />
                <Route exact path="/home/:module" component={Main} />
                <Route component={Main} />
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
