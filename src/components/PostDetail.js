import React, {Component} from 'react';
import { connect } from 'react-redux';
import { formatTimestamp } from '../util/utils';
import CommentTable from './CommentTable';

class PostDetail extends Component {
    render() {

        const { title, author, body, timestamp,
            category, voteScore } = this.props.post;

        return (
                <div className="row my-4">
                    <div className="col-10">
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
                        <div>
                            <i className="fa fa-thumbs-up fa-2x fa-fw" aria-hidden="true" title="Vote up"/>
                            <i className="fa fa-edit fa-2x fa-fw" aria-hidden="true" title="Edit"/>
                        </div>
                        <div style={{"marginTop": "10px"}}>
                            <i className="fa fa-thumbs-down fa-2x fa-fw" aria-hidden="true" title="Vote down"/>
                            <i className="fa fa-trash fa-2x fa-fw" aria-hidden="true" title="Remove"/>
                        </div>
                    </div>
                    <div className="col-12 my-4">
                        <button type="button" className="btn btn-lg btn-outline-primary">New Comment</button>
                    </div>
                    <div className="col-12 my-4">
                        <CommentTable />
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


