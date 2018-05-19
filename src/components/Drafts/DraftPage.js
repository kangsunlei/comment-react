import React, { Component } from 'react';
import marked from 'marked';
import PropTypes from 'prop-types';
import { ajax } from '../../core/common';
import { GET_DRAFT } from '../../constants/API';
import CircularProgress from '@material-ui/core/CircularProgress';

export default class DraftPage extends Component {
    static contextTypes = {
        dispatch: PropTypes.func,
        location: PropTypes.object
    };

    constructor() {
        super();
        this.state = {
            isFetching: true,
            draft: {
                meta: {}
            }
        };
    }

    UNSAFE_componentWillMount() {
        const { id } = this.props;
        ajax({
            url: `${GET_DRAFT}?id=${id}`
        }).then(res => {
            if(res && res.draft) {
                this.setState({
                    draft: res.draft,
                    isFetching: false
                });
            } else {
                this.setState({
                    res,
                    isFetching: false
                });
            }
        });
    }

    render() {
        const { draft, isFetching } = this.state;
        const { title, content, meta: { createAt } } = draft;
        if (isFetching) {
            return (
                <div className="fetching-wrapper">
                    <CircularProgress />
                </div>
            );
        } else {
            return (
                <div className="draft">
                    <h1>{title}</h1>
                    <div className="content" dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
                </div>
            );
        }
    }
}
