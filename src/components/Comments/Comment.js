import React, { Component } from 'react';
import {formatDate} from '../../core/common';
import PropTypes from 'prop-types';

export default class Comment extends Component {
  static propTypes = {
    comment: PropTypes.object.isRequired,
    onDeleteComment: PropTypes.func,
    index: PropTypes.number
  };

  constructor () {
    super();
    this.state = { timeString: '' };
  }

  componentWillMount () {
    this._updateTimeString();
    this._timer = setInterval(
      this._updateTimeString.bind(this),
      5000
    );
  }

  componentWillUnmount () {
    clearInterval(this._timer);
  }

  _updateTimeString () {
    const comment = this.props.comment;
    this.setState({
      timeString: formatDate(comment.createdTime)
    });
  }

  _getProcessedContent (content) {
    return content
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;')
      .replace(/`([\S\s]+?)`/g, '<code>$1</code>');
  }

  handleDeleteComment () {
    if (this.props.onDeleteComment) {
      this.props.onDeleteComment(this.props.index);
    }
  }

  handleModifyComment () {
    if (this.props.onModifyComment) {
      this.props.onModifyComment(this.props.index);
    }
  }

  render () {
    const {comment} = this.props;
    return (
      <div className='comment'>
        <div className='comment-user'>
          <span className='comment-username'>
            {comment.username}
          </span>：
        </div>
        <p dangerouslySetInnerHTML={{
          __html: this._getProcessedContent(comment.content)
        }} />
        <span className='comment-createdtime'>
          {this.state.timeString}
        </span>
        <span
          onClick={this.handleModifyComment.bind(this)}
          className='comment-modify'>
          修改
        </span>
        <span
          onClick={this.handleDeleteComment.bind(this)}
          className='comment-delete'>
          删除
        </span>
      </div>
    );
  }
}
