import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchAllPosts, downVote, upVote, removePost} from '../actions/posts'
import { fetchCommentsForPost } from '../actions/comments';
import {formatTimestamp} from '../util/utils';
import _ from 'lodash';
import Controls from './Controls';
import DeleteModal from './DeleteDialog';

class PostTable extends Component {

    constructor(props) {
        super(props);

        this.state = {
            modalIsOpen: false,
            postId: ''
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.deleteAndClose = this.deleteAndClose.bind(this);
        this.commentCount = this.commentCount.bind(this);
    }

    deleteAndClose() {
        this.props.removePost(this.state.postId)
            .then(() => this.closeModal());
    }

    openModal(id) {
        this.setState({modalIsOpen: true, postId: id});
    }

    closeModal() {
        this.setState({modalIsOpen: false, postId: ''});
    }

    componentDidMount() {
        this.props.fetchAllPosts().then(
            posts => (posts.map(post => this.props.fetchCommentsForPost(post)))
        );
    }

    createLink(post) {
        return `${post.category}/${post.id}`
    }

    commentCount(postId) {
        //console.log(this.props.comments);
        const commentNo = _.size(_.pickBy(this.props.comments, comment => comment.parentId === postId));
        return commentNo;
    }

    render() {
        const {posts} = this.props;

        const postId = this.state.postId;
        const body = posts[postId] ? posts[postId].title : '';

        return (<div>

            <table className="table">
                <thead className="thead-inverse">
                <tr>
                    <th>Title</th>
                    <th className="sortable-table-header">Created&nbsp;<span
                        className="sorting-arrows">&uarr;&darr;</span></th>
                    <th className="sortable-table-header">Score&nbsp;<span
                        className="sorting-arrows">&uarr;&darr;</span></th>
                    <th>Author</th>
                    <th>Category</th>
                    <th>Comments</th>
                    <th>Control</th>
                </tr>
                </thead>
                <tbody>
                {_.map(posts, (post) => {
                    return (
                        <tr key={post.id}>
                            <td><Link to={this.createLink(post)}>{post.title}</Link></td>
                            <td>{formatTimestamp(post.timestamp)}</td>
                            <td className="numberic_right_align">{post.voteScore}</td>
                            <td>{post.author}</td>
                            <td>{post.category}</td>
                            <td className="numberic_right_align">{this.commentCount(post.id)}</td>
                            <td className="controls_column">
                                <Controls objectId={post.id}
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
                <DeleteModal modalLabel="Post Table Delete Dialog"
                             isOpen={this.state.modalIsOpen}
                             title="Delete Post"
                             successBtnLabel="Delete Post"
                             body={body}
                             closeFn={this.closeModal}
                             successFn={this.deleteAndClose}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    posts: state.posts,
    comments: state.comments
});


export default connect(mapStateToProps, {fetchAllPosts, fetchCommentsForPost, downVote, upVote, removePost})(PostTable);