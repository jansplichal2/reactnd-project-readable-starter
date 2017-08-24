import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import { Switch } from 'react-router-dom'
import DeleteDialog from './DeleteDialog';
import MainPage from './MainPage';
import PostDetail from './PostDetail';
import Header from './Header';
import Footer from './Footer';
import './App.css';
import PostForm from './PostForm';

class Readable extends Component {
    render() {
        return (
            <div className="container app">
                <div className="row">
                    <div className="col-12">
                        <Header/>
                    </div>

                    <Route exact path="/" render={() => (
                        <MainPage/>
                    )}/>
                    <Switch>
                        <Route exact path="/posts/new" component={PostForm}/>
                        <Route exact path="/:category/:post_id" render={(route) => {
                            return (<div className="col-12">
                                <PostDetail
                                    post={route.match.params['post_id']}/>
                            </div>);
                        }}/>
                    </Switch>
                    <Route exact path="/:category" render={(route) => (
                        <div>
                            Page 2
                            <DeleteDialog
                                category={route.match.params.category}
                                id="894tuq4ut84ut8v4t8wun89g"/>
                        </div>
                    )}/>

                </div>
                <Footer/>
            </div>
        )
    }
}

export default Readable;