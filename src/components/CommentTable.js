import React, {Component} from 'react';
import {connect} from 'react-redux';
import {downVote, fetchCommentsForPost, removeComment, editComment, upVote} from '../actions/comments';
import PropTypes from 'prop-types';
import {formatTimestamp} from '../util/utils';
import _ from 'lodash';
import Controls from './Controls';
import DeleteModal from './DeleteDialog';

class CommentTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalIsOpen: false,
            commentId: ''
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.deleteAndClose = this.deleteAndClose.bind(this);
    }

    deleteAndClose() {
        this.props.removeComment(this.state.commentId)
            .then(() => this.closeModal());
    }

    componentDidMount() {
        const postId = this.props.post;
        this.props.fetchCommentsForPost(postId);
    }

    openModal(id) {
        this.setState({modalIsOpen: true, commentId: id});
    }

    closeModal() {
        this.setState({modalIsOpen: false, commentId: ''});
    }

    render() {
        const comments = _.pickBy(this.props.comments, comment => comment.parentId === this.props.post);

        if (_.isEmpty(comments)) {
            return <div></div>;
        }

        const commentId = this.state.commentId;
        const body = comments[commentId] ? comments[commentId].body : '';

        return (
            <div>
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
                                              onEdit={(id) => (this.props.onCommentEdit(id))}
                                              onDelete={(id) => (this.openModal(id))}/>
                                </td>
                            </tr>
                        );
                    })}

                    </tbody>
                </table>

                <DeleteModal modalLabel="Delete Comment Dialog"
                             isOpen={this.state.modalIsOpen}
                             title="Delete Comment"
                             successBtnLabel="Delete Comment"
                             body={body}
                             closeFn={this.closeModal}
                             successFn={this.deleteAndClose}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    comments: state.comments
});

CommentTable.propTypes = {
    post: PropTypes.string.isRequired,
    onCommentEdit: PropTypes.func
};


export default connect(mapStateToProps, {
    fetchCommentsForPost, editComment,
    upVote, downVote, removeComment
})(CommentTable);


