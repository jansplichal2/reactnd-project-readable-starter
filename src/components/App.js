import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
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
                    <Route exact path="/" component={MainPage}/>
                    <Route exact path="/posts/new" component={PostForm}/>
                    <Route exact path="/posts/edit/:post_id" component={PostForm}/>
                    <Route exact path="/comments/new/:post_id/:category" component={CommentForm}/>
                    <Route exact path="/:category/:post_id" component={PostDetail}/>
                    <Route exact path="/:category" render={(route) => (
                        <div>
                            Filter by category
                        </div>
                    )}/>
                </Switch>
                <Footer/>
            </div>
        )
    }
}

export default Readable;