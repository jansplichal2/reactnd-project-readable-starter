import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import CategoryList from './CategoriesList';
import DeleteDialog from './DeleteDialog';
import PostPage from './PostPage';
import PostForm from './PostForm';
import PostDetail from './PostDetail';
import PostTable from './PostTable';
import Header from './Header';
import Footer from './Footer';
import './App.css';

class Readable extends Component {
    render() {
        return (
            <div className="app">
                <Route exact path="/" render={() => (
                    <div className="container">
                        <Header page="Home"/>
                        <br/><br/>
                        <CategoryList/>
                        <br/><br/>
                        <PostForm/>
                        <br/><br/>
                        <PostDetail/>
                        <br/><br/>
                        <PostTable/>
                        <br/><br/>
                        <Footer/>
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