import React, { Component } from 'react'
import CommentInput from '../components/CommentInput'
import CommentList from '../components/CommentList'
import ModifyMask from './ModifyMask'
import { connect } from 'react-redux'

class CommentApp extends Component {
  constructor(props, context) {
    super(props, context);
    console.log(props)
  }

  render() {
    const { showMask } = this.props;
    return (
      <div className='wrapper'>
        <CommentInput />
        <CommentList />
        { showMask && <ModifyMask /> }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    showMask: state.showMask
  }
}

export default connect(
  mapStateToProps
)(CommentApp)
