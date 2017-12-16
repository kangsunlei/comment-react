import React, { Component, PropTypes } from 'react';
import Comment from './Comment';
import { initComments, deleteComment, modifyComment } from '../../reducers/comments';

export default class CommentList extends Component {
  static propTypes = {
    comments: PropTypes.array,
    initComments: PropTypes.func,
    onDeleteComment: PropTypes.func
  }

  static contextTypes = {
    dispatch: PropTypes.func,
    location: PropTypes.object
  };

  static defaultProps = {
    comments: []
  }

  componentWillMount () {
    this._loadComments();
  }

  _loadComments () {
    let comments = localStorage.getItem('comments');
    comments = comments ? JSON.parse(comments) : [];
    this.context.dispatch(initComments(comments));
  }

  handleDeleteComment (index) {
    const { comments } = this.props;
    const newComments = [
      ...comments.slice(0, index),
      ...comments.slice(index + 1)
    ];
    localStorage.setItem('comments', JSON.stringify(newComments));
    this.context.dispatch(deleteComment(index));
  }

  handleModifyComment (index) {
    this.context.dispatch(modifyComment(index));
  }

  render() {
    const {comments} = this.props;
    return (
      <div>
        {comments.map((comment, i) =>
          <Comment
            comment={comment}
            key={i}
            index={i}
            onDeleteComment={this.handleDeleteComment.bind(this)}
            onModifyComment={this.handleModifyComment.bind(this)} />
        )}
      </div>
    );
  }
}