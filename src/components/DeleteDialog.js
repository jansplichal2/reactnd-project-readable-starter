import React from 'react';


const DeleteDialog = ( {category, id} ) => {
    return (
        <div>
            This is a delete dialog
                <br/>
            <b>ID:</b> {id}
                <br/>
            <b>Category:</b> {category}
        </div>
    );
};

export default DeleteDialog;