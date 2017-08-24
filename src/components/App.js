import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import CategoryList from './CategoriesList';
import DeleteDialog from './DeleteDialog';
import MainPage from './MainPage';
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
                        <MainPage />
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
                        <div className="col-12 pl-0">
                            <PostDetail
                                post="6ni6ok3ym7mf1p33lnez"/>
                        </div>
                    )}/>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default Readable;