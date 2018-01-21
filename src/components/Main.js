import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import CommentApp from './Comments/CommentApp';
import List from './Lists/List';
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
        let { comments, match: { params: { module } } } = this.props;
        comments = comments.getIn(['items']).toJS();

        if (module) {
            if (module === 'list') {
                return <List />;
            } else if (module === 'editor') {
                return <Editor />;
            }
        } else {
            return <CommentApp comments={comments} />;
        }
    }

    render() {
        return (
            <div className="main">
                {this.renderMainView()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        comments: state.comments
    };
}

// 包装 component ，注入 dispatch 和 state 到其默认的 connect(select)(Main) 中；
export default connect(mapStateToProps)(withRouter(Main));
