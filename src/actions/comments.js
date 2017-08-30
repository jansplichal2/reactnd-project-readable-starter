import {ADD_NEW_COMMENT, GET_COMMENT, GET_COMMENTS_FOR_POST, DELETE_COMMENT} from './index';
import * as ReadableAPI from '../util/readableAPI';


const getCommentsForPost = comments => ({
    type: GET_COMMENTS_FOR_POST,
    comments
});

const newComment = comment => ({
    type: ADD_NEW_COMMENT,
    comment
});

const updateComment = comment => ({
    type: GET_COMMENT,
    comment
});

const deleteComment = id => ({
    type: DELETE_COMMENT,
    id
});

export const fetchCommentsForPost = postId => dispatch => {
    return ReadableAPI
        .getPostComments(postId)
        .then((comments) => dispatch(getCommentsForPost(comments)));
};

export const createComment = ({body, parent}) => dispatch => {
    return ReadableAPI
        .createComment(parent, body)
        .then(comment => dispatch(newComment(comment)));
};

export const upVote = id => dispatch => (
    ReadableAPI.upVoteComment(id)
        .then(comment => dispatch(updateComment(comment)))
);

export const downVote = id => dispatch => (
    ReadableAPI.downVoteComment(id)
        .then(comment => dispatch(updateComment(comment)))
);

export const removeComment = id => dispatch => (
    ReadableAPI.removeComment(id)
        .then(comment => dispatch(deleteComment(comment.id)))
);

export const editComment = values => dispatch => (
    ReadableAPI.editComment(values)
        .then(comment => dispatch(updateComment(comment)))
);

export const fetchComment = id => dispatch => (
    ReadableAPI
        .getComment(id)
        .then(comment => dispatch(updateComment(comment)))
);
