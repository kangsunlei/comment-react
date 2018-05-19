import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import DraftItem from './DraftItem';
import { actions } from '../../models/drafts';

import '../../css/drafts.css';

export default class DraftList extends Component {
    static contextTypes = {
        dispatch: PropTypes.func,
        location: PropTypes.object
    };

    UNSAFE_componentWillMount() {
        this.context.dispatch(actions.fetchDrafts());
    }

    render() {
        const { drafts } = this.props;
        const { items: draftItems, isFetching } = drafts.toJS();
        if (isFetching) {
            return (
                <div className="fetching-wrapper">
                    <CircularProgress />
                </div>
            );
        } else {
            return (
                <div className="drafts-wrapper">
                    {draftItems.map(item => <DraftItem key={item._id} item={item}/>)}
                </div>
            );
        }
    }
}
