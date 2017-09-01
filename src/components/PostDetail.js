import React, {Component} from 'react';
import {connect} from 'react-redux';
import CommentTable from './CommentTable';
import {Link} from 'react-router-dom';
import Controls from './Controls';
import {downVote, upVote, removePost, fetchPost} from '../actions/posts'
import DeleteModal from './DeleteDialog';
import PostSummary from './PostSummary';
import _ from 'lodash';
import ObjectNotFound from './ObjectNotFound';

class PostDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalIsOpen: false,
            postId: '',
            postNotFound: false
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.deleteAndClose = this.deleteAndClose.bind(this);
    }

    deleteAndClose() {
        this.props.removePost(this.state.postId)
            .then(() => {
                this.closeModal();
                this.props.history.push('/');
            });
    }

    openModal(id) {
        this.setState({modalIsOpen: true, postId: id});
    }

    closeModal() {
        this.setState({modalIsOpen: false, postId: ''});
    }

    componentDidMount() {
        this.setState({postNotFound: false});
        this.props.fetchPost(this.props.match.params['post_id'])
            .then(status => {
                if (status >= 400) {
                    // issue in the server code - I would expect 404 instead of 500 when post is not found
                    this.setState({postNotFound: true});
                } else {
                    this.setState({postNotFound: false});
                }
            });
    }

    render() {
        const post = this.props.post;
        if (this.state.postNotFound) {
            return <ObjectNotFound name="post"/>;
        } else if(!post){
            return <span/>;
        }

        const {
            title, author, body, timestamp,
            id, category, voteScore
        } = post;

        return (
            <div className="row justify-content-between my-2">
                <div className="col-6 col-sm-8">
                    <PostSummary title={title} author={author}
                                 timestamp={timestamp} voteScore={voteScore}
                                 body={body} commentsNo={this.props.commentNo}
                    />
                </div>
                <div className="col-6 col-sm-4 col-md-2">
                    <div className="float-right">
                        <Controls size="large" objectId={id}
                                  onVoteUp={(id) => (this.props.upVote(id))}
                                  onVoteDown={(id) => (this.props.downVote(id))}
                                  onEdit={(id) => (this.props.history.push(`/posts/edit/${id}`))}
                                  onDelete={(id) => (this.openModal(id))}/>
                    </div>
                </div>
                <div className="col-10 mt-5">
                    <Link className="btn btn-lg btn-outline-primary" to={`/comments/new/${category}/${id}`}>New Comment
                        ...</Link>
                </div>
                <div className="col-10 mt-5">
                    <CommentTable post={id}
                                  onCommentEdit={(commentId) => (this.props.history.push(`/comments/edit/${category}/${commentId}`))}/>
                </div>
                <DeleteModal modalLabel="Post Detail Delete Dialog"
                             isOpen={this.state.modalIsOpen}
                             title="Delete Post"
                             successBtnLabel="Delete Post"
                             body={title}
                             closeFn={this.closeModal}
                             successFn={this.deleteAndClose}
                />
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    const postId = props.match.params['post_id'];
    const comments = state.comments || {};
    const commentNo = _.size(_.pickBy(comments, comment => comment.parentId === postId));
    return {
        post: state.posts[postId],
        commentNo
    }
};

export default connect(mapStateToProps, {fetchPost, downVote, upVote, removePost})(PostDetail);


