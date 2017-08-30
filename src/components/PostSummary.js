import React from 'react';
import {formatTimestamp} from '../util/utils';
import PropTypes from 'prop-types';

const PostSummary = ({title, author, timestamp, voteScore, commentsNo, body}) => (
    <div>
        <div className="post-detail-row">
            <span className="post-detail-header">Title: </span>
            <span className="post-detail-data">{title}</span>
        </div>
        <div className="post-detail-row">
            <span className="post-detail-header">Author: </span>
            <span className="post-detail-data">{author}</span>
        </div>
        <div className="post-detail-row">
            <span className="post-detail-header">Created: </span>
            <span className="post-detail-data">{formatTimestamp(timestamp)}</span>
        </div>
        <div className="post-detail-row">
            <span className="post-detail-header">Score: </span>
            <span className="post-detail-data">{voteScore}</span>
        </div>
        <div className="post-detail-row">
            <span className="post-detail-header">No of comments: </span>
            <span className="post-detail-data">{commentsNo}</span>
        </div>

        <div className="post-detail-text" style={{"marginTop": "12px"}}>
            <span className="post-detail-body">
                {body}
            </span>
        </div>
    </div>
);

PostSummary.propTypes = {
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
    voteScore: PropTypes.number.isRequired,
    commentsNo: PropTypes.number.isRequired,
};

export default PostSummary;