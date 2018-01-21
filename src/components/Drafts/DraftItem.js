import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { formatDate } from '../../core/common';

export default class DraftItem extends Component {
    static contextTypes = {
        dispatch: PropTypes.func,
        location: PropTypes.object
    };

    render() {
        const { item } = this.props;
        const { title, content, meta: { updateAt } } = item;
        return (
            <div className="draft-items">
                <Card>
                    <CardContent>
                        <Typography className="time">{formatDate(updateAt)}</Typography>
                        <Typography className="title" type="headline" component="h2">{title}</Typography>
                        <Typography className="content">{content}</Typography>
                    </CardContent>
                    <CardActions>
                        <Button dense>查看详情</Button>
                    </CardActions>
                </Card>
            </div>
        );
    }
}
