import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import marked from 'marked';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { formatDate } from '../../core/common';

export default class DraftItem extends Component {
    static contextTypes = {
        dispatch: PropTypes.func,
        location: PropTypes.object
    };

    render() {
        const { item } = this.props;
        const { title, content, _id, meta: { updateAt } } = item;
        return (
            <div className="draft-items">
                <Card>
                    <CardContent>
                        <Typography className="time">{formatDate(updateAt)}</Typography>
                        <Typography className="title" type="headline" component="h2">{title}</Typography>
                        <Typography className="content" dangerouslySetInnerHTML={{ __html: marked(content) }}></Typography>
                    </CardContent>
                    <CardActions>
                        <Button dense="true"><Link to={`/home/draft/${_id}`}>查看详情</Link></Button>
                    </CardActions>
                </Card>
            </div>
        );
    }
}
