import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import CommentApp from './components/CommentApp'
import commentsReducer from './reducers/comments'
import logger from 'redux-logger'
import './index.css'

const store = createStore(
  commentsReducer,
  compose(
    applyMiddleware(logger),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ))

ReactDOM.render(
  <Provider store={store}>
    <CommentApp />
  </Provider>,
  document.getElementById('root')
);
