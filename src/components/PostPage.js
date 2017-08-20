import React from 'react';
import Edit from 'react-icons/lib/fa/edit'
//import DeleteDialog from './DeleteDialog';
import CategoriesList from './CategoriesList';

const PostPage = ( {post} ) => {
    return (
        <div>
            <Edit /> Edit
            <br/>
            <CategoriesList/>
            This is a post detail: {post}
        </div>
    );
};

export default PostPage;