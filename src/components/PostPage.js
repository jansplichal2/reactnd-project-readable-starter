import React from 'react';
//import Edit from 'react-icons/lib/fa/edit'
import CategoriesList from './CategoriesList';
import PostTable from './PostTable';

const PostPage = ( {post} ) => {
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
                    <button type="button" className="btn btn-lg btn-outline-primary">New Post</button>
                </div>
            </div>
        </div>
    );
};

export default PostPage;