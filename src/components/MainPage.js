import React from 'react';
import CategoriesList from './CategoriesList';
import PostTable from './PostTable';
import { Link } from 'react-router-dom';

const MainPage = () => {
    return (
        <div className="mt-4">
            <div className="row">
                <div className="col-3">
                    <CategoriesList/>
                </div>
                <div className="col-9">
                    <PostTable />
                </div>
                <div className="ml-auto col-9 my-4">
                    <Link className="btn btn-lg btn-outline-primary" to="/posts/new">New Post</Link>
                </div>
            </div>
        </div>
    );
};

export default MainPage;