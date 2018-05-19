import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';
import { actions } from '../../models/comments';

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

    UNSAFE_componentWillMount() {
        this.context.dispatch(actions.initComments());
    }

    handleDeleteComment(index) {
        this.context.dispatch(actions.deleteComment(index));
    }

    handleModifyComment(index) {
        this.context.dispatch(actions.modifyComment(index));
    }

    render() {
        const { comments } = this.props;
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