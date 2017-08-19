import React from 'react';
import { connect } from 'react-redux';

const CommentBox = ( {comment} ) => {
    return (
        <div>
            This is a comment
            <div>{comment.body}</div>
        </div>
    );
};


const mapStateToProps = (state, props) => ({
    comment: state.comments[props.commentId]
});

const mapDispatchToProps = (dispatch) => ({
    //handleAdd: contact => dispatch(addContact(contact))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CommentBox);