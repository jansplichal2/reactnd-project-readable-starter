import React from 'react';
import CategoriesList from './CategoriesList';
import PostTable from './PostTable';
import { Link } from 'react-router-dom';

const MainPage = () => {
    return (
        <div className="mt-4">
            <div className="row">
                <div className="col-12 col-md-3 col-lg-2 mb-3">
                    <CategoriesList/>
                </div>
                <div className="col-12 col-md-9 col-lg-10">
                    <PostTable />
                </div>
                <div className="ml-auto col-12 col-md-9 col-lg-10 my-4">
                    <Link className="btn btn-lg btn-outline-primary" to="/posts/new">New Post</Link>
                </div>
            </div>
        </div>
    );
};

export default MainPage;