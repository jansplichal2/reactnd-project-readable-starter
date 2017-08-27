import React, {Component} from 'react';
import {connect} from 'react-redux';
import {formatTimestamp} from '../util/utils';
import CommentTable from './CommentTable';
import {Link} from 'react-router-dom';
import Controls from './Controls';
import {downVote, upVote, removePost} from '../actions/posts'
import DeleteModal from './DeleteDialog';

class PostDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalIsOpen: false,
            postId: ''
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.deleteAndClose = this.deleteAndClose.bind(this);
    }

    deleteAndClose() {
        this.props.removePost(this.state.postId)
            .then(() => {this.closeModal(); this.props.history.push('/');});
    }

    openModal(id) {
        this.setState({modalIsOpen: true, postId: id});
    }

    closeModal() {
        this.setState({modalIsOpen: false, postId: ''});
    }

    render() {
        const post = this.props.post;
        if (!post) {
            return <span/>;
        }

        const {
            title, author, body, timestamp,
            id,category, voteScore
        } = post;

        return (
            <div className="row justify-content-between my-2">
                <div className="col-8">
                    <div>
                        <div className="">
                            <span className="post-detail-header">Title: </span>
                            <span className="post-detail-data">{title}</span>
                        </div>
                        <div className="">
                            <span className="post-detail-header">Author: </span>
                            <span className="post-detail-data">{author}</span>
                        </div>
                        <div className="">
                            <span className="post-detail-header">Created: </span>
                            <span className="post-detail-data">{formatTimestamp(timestamp)}</span>
                        </div>
                        <div className="">
                            <span className="post-detail-header">Score: </span>
                            <span className="post-detail-data">{voteScore}</span>
                        </div>
                        <div className="">
                            <span className="post-detail-header">No of comments: </span>
                            <span className="post-detail-data">5</span>
                        </div>

                        <div className="" style={{"marginTop": "12px"}}>
                            <span className="post-detail-body">
                                {body}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="col-2">
                    <div className="float-right">
                        <Controls size="large" objectId={id}
                                  onVoteUp={(id) => (this.props.upVote(id))}
                                  onVoteDown={(id) => (this.props.downVote(id))}
                                  onEdit={(id) => (console.log('Edit', id))}
                                  onDelete={(id) => (this.openModal(id))}/>
                    </div>
                </div>
                <div className="col-10 mt-5">
                    <Link className="btn btn-lg btn-outline-primary" to={`/comments/new/${id}/${category}`}>New Comment ...</Link>
                </div>
                <div className="col-10 mt-5">
                    <CommentTable post={id}/>
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
    return {
        post: state.posts[props.match.params['post_id']]
    }
};

export default connect(mapStateToProps, {downVote, upVote, removePost})(PostDetail);


