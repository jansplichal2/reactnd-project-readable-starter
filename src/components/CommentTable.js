import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCommentsForPost } from '../actions/comments';
import PropTypes from 'prop-types';
import {formatTimestamp} from '../util/utils';
import _ from 'lodash';

class CommentTable extends Component {
    componentDidMount(){
        const postId = this.props.post;
        this.props.fetchCommentsForPost(postId);
    }

    render(){
        const { comments } = this.props;

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
                                <i className="fa fa-thumbs-up" aria-hidden="true" title="Vote up"/>
                                <i className="fa fa-thumbs-down" aria-hidden="true" title="Vote down"/>
                                <br/>
                                <i className="fa fa-edit" aria-hidden="true" title="Edit"/>
                                <i className="fa fa-trash" aria-hidden="true" title="Remove"/>
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


export default connect(mapStateToProps, { fetchCommentsForPost })(CommentTable);


