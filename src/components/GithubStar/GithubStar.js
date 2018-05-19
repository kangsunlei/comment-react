import React, { Component } from 'react';
import '../../css/githubStar.css';

export default class GithubStar extends Component {

    constructor(props) {
        super(props);
    }

    fetchList = () => {

    }

    render() {
        return (
            <div className="main-content github-star">
                <div className="list"></div>
                <div className="container"></div>
            </div>
        );
    }
}