import React, { Component, PropTypes } from 'react';
import CommentInput from './CommentInput';
import CommentList from './CommentList';
import Test from './Test';
import { connect } from 'react-redux';
import { addComment } from '../reducers/comments';

class CommentApp extends Component {

  static propTypes = {
    dispatch: PropTypes.func
  };

  static childContextTypes = {
    dispatch: PropTypes.func
  };

  getChildContext() {
    return {
      dispatch: this.props.dispatch
    };
  }

  addComment = (comment, index) => {
    this.props.dispatch(addComment(comment, index));
  }

  render() {
    const { showMask, comments, modifyIndex } = this.props;
    return (
      <div className='wrapper'>
        <CommentInput onSubmit={this.addComment} comments={comments} />
        <CommentList comments={comments} />
        <Test/>
        { showMask && <div className="mask">
            <CommentInput isModify={true} index={modifyIndex} comments={comments} onSubmit={this.addComment} />
          </div> }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    showMask: state.showMask,
    modifyIndex: state.modifyIndex,
    comments: state.comments
  };
};

export default connect(
  mapStateToProps
)(CommentApp);
