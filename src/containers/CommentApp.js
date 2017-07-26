import React, { Component } from 'react'
import CommentInput from './CommentInput'
import CommentList from './CommentList'
import ModifyMask from './ModifyMask'

export default class CommentApp extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showMask: false
    }
  }

  render() {
    const { showMask } = this.state;
    return (
      <div className='wrapper'>
        <CommentInput />
        <CommentList />
        {
          showMask && <ModifyMask />
        }

      </div>
    )
  }
}
