import React, { Component, PropTypes } from 'react';

export default class CommentInput extends Component {
  static propTypes = {
    comments: PropTypes.array,
    onSubmit: PropTypes.func,
    username: PropTypes.any
  };

  static defaultProps = {
    username: ''
  };

  constructor (props) {
    super(props);
    const {index, comments, isModify} = props;
    const comment = comments[index];
    const {username, content} = isModify ? comment : props;
    this.state = {
      comment,
      username,
      content,
      index,
      isModify
    };
  }

  componentWillMount () {
    this._loadUsername();
  }

  _loadUsername () {
    if(this.state.username) return;

    const username = localStorage.getItem('username');
    if (username) {
      this.setState({ username });
    }
  }

  _saveUsername (username) {
    localStorage.setItem('username', username);
  }

  componentDidMount () {
    this.textarea.focus();
  }

  handleUsernameBlur (event) {
    if (this.props.onUserNameInputBlur) {
      this.props.onUserNameInputBlur(event.target.value);
    }
  }

  handleUsernameChange (event) {
    this.setState({
      username: event.target.value
    });
  }

  handleContentChange (event) {
    this.setState({
      content: event.target.value
    });
  }

  handleSubmitComment (comment, index) {
    if (!comment) return;
    if (!comment.username) return alert('请输入用户名');
    if (!comment.content) return alert('请输入评论内容');
    const { comments } = this.props;
    let newComments = [...comments];
    if(index !== undefined) {
      newComments[index] = comment;
    } else {
      newComments.push(comment);
    }
    localStorage.setItem('comments', JSON.stringify(newComments));
    if (this.props.onSubmit) {
      this.props.onSubmit(comment, index);
    }
  }

  handleSubmit (index) {
    this.handleSubmitComment({
      id: `com_${new Date().getTime()}`,
      username: this.state.username,
      content: this.state.content,
      createdTime: +new Date()
    }, index);
    this.setState({ content: '' });
  }

  render () {
    const {username, content, isModify, index} = this.state;
    return (
      <div className='comment-input'>
        { isModify && <div className="comment-field">修改评论</div> }
        <div className='comment-field'>
          <span className='comment-field-name'>用户名：</span>
          <div className='comment-field-input'>
            <input
              value={username}
              onBlur={this.handleUsernameBlur.bind(this)}
              onChange={this.handleUsernameChange.bind(this)}
              disabled={isModify} />
          </div>
        </div>
        <div className='comment-field'>
          <span className='comment-field-name'>评论内容：</span>
          <div className='comment-field-input'>
            <textarea
              ref={(textarea) => this.textarea = textarea}
              value={content}
              onChange={this.handleContentChange.bind(this)} />
          </div>
        </div>
        <div className='comment-field-button'>
          { isModify && <button className='cancle-btn' onClick={this.handleSubmit.bind(this, -1)}>取消</button> }
          <button onClick={this.handleSubmit.bind(this, index)}>发布</button>
        </div>
      </div>
    );
  }
}