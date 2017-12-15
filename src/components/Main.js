import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

class Main extends Component {
    static propTypes = {
        dispatch: PropTypes.func,
        location: PropTypes.object
    };

    static childContextTypes = {
        dispatch: PropTypes.func,
        location: PropTypes.object
    };

    constructor (props){
        super(props);
    }
    componentDidMount () {
        console.log(this.props)
    }
    render() {
        return(
            <h1>Main</h1>
        )
    }
}

function mapStateToProps(state) {
    return {
        comment: state.comment
    };
}

// 包装 component ，注入 dispatch 和 state 到其默认的 connect(select)(Main) 中；
export default connect(mapStateToProps)(withRouter(Main));