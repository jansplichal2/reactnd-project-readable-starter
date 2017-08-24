import React, {Component} from 'react';
import {connect} from 'react-redux';
import {formatTimestamp} from '../util/utils';
import CommentTable from './CommentTable';
import {Link} from 'react-router-dom';

class PostDetail extends Component {
    render() {
        const post = this.props.post;
        if (!post) {
            return <span/>;
        }

        const {
            title, author, body, timestamp,
            category, voteScore
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
                        <div>
                            <i className="fa fa-thumbs-up fa-2x fa-fw" aria-hidden="true" title="Vote up"/>
                            <i className="fa fa-edit fa-2x fa-fw" aria-hidden="true" title="Edit"/>
                        </div>
                        <div className="mt-2">
                            <i className="fa fa-thumbs-down fa-2x fa-fw" aria-hidden="true" title="Vote down"/>
                            <i className="fa fa-trash fa-2x fa-fw" aria-hidden="true" title="Remove"/>
                        </div>
                    </div>
                </div>
                <div className="col-10 mt-5">
                    <Link className="btn btn-lg btn-outline-primary" to="/">New Comment ...</Link>
                </div>
                <div className="col-10 mt-5">
                    <CommentTable post={post.id}/>
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


