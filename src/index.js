import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import Main from './components/Main';
import Login from './components/Login';
import commentsReducer from './reducers/comments';
import logger from 'redux-logger';
import './css/index.css';

const store = createStore(
  commentsReducer,
  compose(
    applyMiddleware(logger),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

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
