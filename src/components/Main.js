import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import CommentApp from './Comments/CommentApp';

class Main extends Component {
    static propTypes = {
        dispatch: PropTypes.func,
        location: PropTypes.object
    };

    static childContextTypes = {
        dispatch: PropTypes.func,
        location: PropTypes.object
    };

    constructor(props) {
        super(props);
    }

    getChildContext() {
        return {
            dispatch: this.props.dispatch,
            location: this.props.location
        };
    }

    render() {
        const { comments } = this.props;
        return <div className="main">
            <CommentApp comments={comments} />
        </div>;
    }
}

function mapStateToProps(state) {
    return {
        comments: state.comments
    };
}

// 包装 component ，注入 dispatch 和 state 到其默认的 connect(select)(Main) 中；
export default connect(mapStateToProps)(withRouter(Main));