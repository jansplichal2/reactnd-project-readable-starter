import React, {Component} from 'react';

class PostDetail extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-4">
                    <div style={{"padding": "15px"}}>
                        <div className="">
                            <span className="post-detail-header">Title: </span>
                            <span className="post-detail-data">Udacity is the place to learn React</span>
                        </div>
                        <div className="">
                            <span className="post-detail-header">Author: </span>
                            <span className="post-detail-data">thingone</span>
                        </div>
                        <div className="">
                            <span className="post-detail-header">Created: </span>
                            <span className="post-detail-data">12/12/2017</span>
                        </div>
                        <div className="">
                            <span className="post-detail-header">Score: </span>
                            <span className="post-detail-data">4</span>
                        </div>
                        <div className="">
                            <span className="post-detail-header">No of comments: </span>
                            <span className="post-detail-data">5</span>
                        </div>

                        <div className="" style={{"marginTop": "12px"}}>
                            <span className="post-detail-body">
                                Learn Redux in 10 minutes!
                                Just kidding. It takes more than 10 minutes to learn technology.
                            </span>
                        </div>
                    </div>
                </div>
                <div className="col-4" style={{"padding": "15px"}}>
                    <div>
                        <i className="fa fa-thumbs-up fa-2x fa-fw" aria-hidden="true" title="Vote up"/>
                        <i className="fa fa-edit fa-2x fa-fw" aria-hidden="true" title="Edit"/>
                    </div>
                    <div style={{"marginTop": "10px"}}>
                        <i className="fa fa-thumbs-down fa-2x fa-fw" aria-hidden="true" title="Vote down"/>
                        <i className="fa fa-trash fa-2x fa-fw" aria-hidden="true" title="Remove"/>
                    </div>
                </div>
            </div>
        );
    }
}

export default PostDetail;


