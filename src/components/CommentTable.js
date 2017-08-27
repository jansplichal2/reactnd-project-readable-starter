import React, {Component} from 'react';
import {connect} from 'react-redux';
import {downVote, fetchCommentsForPost, removeComment, upVote} from '../actions/comments';
import PropTypes from 'prop-types';
import {formatTimestamp} from '../util/utils';
import _ from 'lodash';
import Controls from './Controls';
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '40%',
        left: '40%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '0px'
    }
};


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
        const {comments} = this.props;
        if (_.isEmpty(comments)) {
            return <div></div>;
        }

        const commentId = this.state.commentId;

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
                                              onEdit={(id) => (console.log('Edit', id))}
                                              onDelete={(id) => (this.openModal(id))}/>
                                </td>
                            </tr>
                        );
                    })}

                    </tbody>
                </table>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    contentLabel="Delete Comment Dialog"
                    style={customStyles}
                >
                    <div style={{marginRight: '10px', marginTop: '3px'}}>
                        <button type="button" className="close" onClick={this.closeModal}>
                            <span>&times;</span>
                        </button>
                    </div>

                    <div className="content-group m-4">
                        <h3 className="mb-5">Delete Comment</h3>
                        <hr/>
                        Do you wish to delete comment: <br/>
                        {commentId && comments[commentId] ? _.truncate(comments[commentId].body, {length: 35}) : ''}
                        <hr/>
                        <button type="submit" onClick={this.deleteAndClose}
                                className="btn btn-lg btn-outline-primary">Delete
                            Comment
                        </button>
                        <button onClick={this.closeModal}
                                className="ml-2 btn btn-lg btn-outline-danger">Cancel
                        </button>
                    </div>

                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    comments: state.comments
});

CommentTable.propTypes = {
    post: PropTypes.string.isRequired
};


export default connect(mapStateToProps, {
    fetchCommentsForPost,
    upVote, downVote, removeComment
})(CommentTable);

