import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CommentInput from './CommentInput';
import CommentList from './CommentList';
// import Test from '../Test';
import { actions } from '../../models/comments';

export default class CommentApp extends Component {

    static contextTypes = {
        dispatch: PropTypes.func,
        location: PropTypes.object
    };

    addComment = (comment) => {
        this.context.dispatch(actions.addComment(comment));
    }

    render() {
        const { showMask, comments, modifyIndex } = this.props;
        const { items:commentItems } = comments.toJS();

        return (
            <div className='wrapper'>
                <CommentInput onSubmit={this.addComment} comments={commentItems} />
                <CommentList comments={commentItems} />
                {/* <Test/> */}
                {showMask && <div className="mask">
                    <CommentInput isModify={true} index={modifyIndex} comments={commentItems} onSubmit={this.addComment} />
                </div>}
            </div>
        );
    }
}
