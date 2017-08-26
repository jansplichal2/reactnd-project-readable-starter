import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCommentsForPost, upVote, downVote } from '../actions/comments';
import PropTypes from 'prop-types';
import {formatTimestamp} from '../util/utils';
import _ from 'lodash';
import Controls from './Controls';

class CommentTable extends Component {
    componentDidMount(){
        const postId = this.props.post;
        this.props.fetchCommentsForPost(postId);
    }

    render(){
        const { comments, post } = this.props;

        if(_.isEmpty(comments)){
            return <div></div>;
        }

        return (
            <table className="table">
                <thead className="thead-inverse">
                <tr>
                    <th>Text</th>
                    <th className="sortable-table-header">Created&nbsp;<span
                        className="sorting-arrows">&uarr;&darr;</span></th>
                    <th className="sortable-table-header">Score&nbsp;<span
                        className="sorting-arrows">&uarr;&darr;</span></th>
                    <th>Author</th>
                    <th>Control</th>
                </tr>
                </thead>
                <tbody>
                {_.map(comments, (comment) => {
                    return (
                        <tr key={comment.id}>
                            <td>{comment.body}</td>
                            <td>{formatTimestamp(comment.timestamp)}</td>
                            <td className="numberic_right_align">{comment.voteScore}</td>
                            <td>{comment.author}</td>
                            <td className="controls_column">
                                <Controls objectId={comment.id}
                                          onVoteUp={(id) => (this.props.upVote(id))}
                                          onVoteDown={(id) => (this.props.downVote(id))}
                                          onEdit={(id) => (console.log('Edit', id))}
                                          onDelete={(id) => (console.log('Delete', id))}/>
                            </td>
                        </tr>
                    );
                })}

                </tbody>
            </table>
        );
    }
}

const mapStateToProps = (state) =>({
   comments: state.comments
});

CommentTable.propTypes = {
  post: PropTypes.string.isRequired
};


export default connect(mapStateToProps, { fetchCommentsForPost, upVote, downVote })(CommentTable);


