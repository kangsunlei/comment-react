import React, { Component } from 'react'
import CommentInput from './CommentInput'

class ModifyMask extends Component {
  render() {
    const { username, content } = this.props; 
    return (
      <div className="mask">
        <CommentInput
          username={username}
          content={content} 
        />
      </div>
    )
  }
}

export default ModifyMask