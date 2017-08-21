import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import CommentBox from './CommentBox';
import DeleteDialog from './DeleteDialog';
import PostPage from './PostPage';


class Readable extends Component {
    render() {
        return (
            <div className="app">
                <Route exact path="/" render={() => (
                    <div>
                        Page 1
                        <CommentBox commentId="894tuq4ut84ut8v4t8wun89g"/>
                    </div>
                )}/>
                <Route exact path="/:category" render={(route) => (
                    <div>
                        Page 2
                        <DeleteDialog
                            category={route.match.params.category}
                            id="894tuq4ut84ut8v4t8wun89g"/>
                    </div>
                )}/>
                <Route path="/:category/:post_id" render={(route) => (
                    <div>
                        Post detail
                        <PostPage
                            post="894tuq4ut84ut8v4t8wun89g"/>
                    </div>
                )}/>
            </div>
        )
    }
}

export default Readable;