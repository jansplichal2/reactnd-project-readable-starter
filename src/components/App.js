import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import DeleteDialog from './DeleteDialog';
import MainPage from './MainPage';
import PostDetail from './PostDetail';
import Header from './Header';
import Footer from './Footer';
import './App.css';
import PostForm from './PostForm';
import CommentForm from './CommentForm';

class Readable extends Component {
    render() {
        return (
            <div className="container app">
                <Header/>
                <Switch>
                    <Route exact path="/" render={() => (
                        <MainPage/>
                    )}/>
                    <Route exact path="/posts/new" component={PostForm}/>
                    <Route exact path="/comments/new/:post_id/:category" component={CommentForm}/>
                    <Route exact path="/:category/:post_id" render={(route) => {
                        return (
                            <PostDetail
                                post={route.match.params['post_id']}/>
                        );
                    }}/>
                    <Route exact path="/:category" render={(route) => (
                        <div>
                            Page 2
                            <DeleteDialog
                                category={route.match.params.category}
                                id="894tuq4ut84ut8v4t8wun89g"/>
                        </div>
                    )}/>
                </Switch>
                <Footer/>
            </div>
        )
    }
}

export default Readable;