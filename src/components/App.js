import React, {Component} from 'react';
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
            <div className="container app">
                <div className="row">
                    <div className="col-12">
                        <Header page="Home"/>
                    </div>


                    <Route exact path="/" render={() => (
                        <PostPage />
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
                <Footer/>
            </div>
        )
    }
}

export default Readable;