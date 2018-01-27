import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router';
import { connect } from 'react-redux';
import MainHeader from './MainHeader';
import CommentApp from './Comments/CommentApp';
import DraftList from './Drafts/DraftList';
import Editor from './Editor/Editor';

class Main extends Component {
    static propTypes = {
        dispatch: PropTypes.func,
        location: PropTypes.object
    };

    static childContextTypes = {
        dispatch: PropTypes.func,
        location: PropTypes.object
    };

    getChildContext() {
        return {
            dispatch: this.props.dispatch,
            location: this.props.location
        };
    }

    renderMainView() {
        let { comments, drafts,  match: { params: { module } } } = this.props;

        if (module) {
            switch (module) {
                case 'list':
                    return <DraftList drafts={drafts} />;
                case 'editor':
                    return <Editor />;
                case 'comment':
                    return <CommentApp comments={comments} />;
                default:
                    return <Redirect to={{ pathname: '/home/comment' }} />;
            }
        } else {
            return <Redirect to={{ pathname: '/home/comment' }} />;;
        }
    }

    render() {
        return (
            <div className="main">
                <MainHeader/>
                {this.renderMainView()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        comments: state.comments,
        drafts: state.drafts
    };
}

// 包装 component ，注入 dispatch 和 state 到其默认的 connect(select)(Main) 中；
export default connect(mapStateToProps)(withRouter(Main));
