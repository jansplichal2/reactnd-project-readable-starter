import React, {Component} from 'react';
import {connect} from 'react-redux';
import {formatTimestamp} from '../util/utils';
import CommentTable from './CommentTable';
import {Link} from 'react-router-dom';
import Controls from './Controls';

class PostDetail extends Component {
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
                                  onVoteUp={(id) => (console.log('Vote up', id))}
                                  onVoteDown={(id) => (console.log('Vote down', id))}
                                  onEdit={(id) => (console.log('Edit', id))}
                                  onDelete={(id) => (console.log('Delete', id))}/>
                    </div>
                </div>
                <div className="col-10 mt-5">
                    <Link className="btn btn-lg btn-outline-primary" to={`/comments/new/${id}/${category}`}>New Comment ...</Link>
                </div>
                <div className="col-10 mt-5">
                    <CommentTable post={id}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    //console.log('State', state);
    //console.log('Props', props);
    return {
        post: state.posts[props.post]
    }
};

export default connect(mapStateToProps)(PostDetail);


