import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Comment from './Comment'
import { initComments, deleteComment, modifyComment } from '../reducers/comments'

class CommentList extends Component {
  static propTypes = {
    comments: PropTypes.array,
    initComments: PropTypes.func,
    onDeleteComment: PropTypes.func
  }

  static defaultProps = {
    comments: []
  }

  componentWillMount () {
    this._loadComments()
  }

  _loadComments () {
    let comments = localStorage.getItem('comments')
    comments = comments ? JSON.parse(comments) : []
    this.props.initComments(comments)
  }

  handleDeleteComment (index) {
    const { comments } = this.props
    const newComments = [
      ...comments.slice(0, index),
      ...comments.slice(index + 1)
    ]
    localStorage.setItem('comments', JSON.stringify(newComments))
    if (this.props.onDeleteComment) {
      this.props.onDeleteComment(index)
    }
  }

  handleModifyComment (index) {
    if (this.props.onModifyComment) {
      this.props.onModifyComment(index)
    }
  }

  render() {
    return (
      <div>
        {this.props.comments.map((comment, i) =>
          <Comment
            comment={comment}
            key={i}
            index={i}
            onDeleteComment={this.handleDeleteComment.bind(this)}
            onModifyComment={this.handleModifyComment.bind(this)} />
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    comments: state.comments
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    initComments: (comments) => {
      dispatch(initComments(comments))
    },
    onDeleteComment: (commentIndex) => {
      dispatch(deleteComment(commentIndex))
    },
    onModifyComment: (index) => {
      dispatch(modifyComment(index))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentList)
