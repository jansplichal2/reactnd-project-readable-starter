import {ADD_NEW_COMMENT, GET_COMMENTS_FOR_POST} from './index';
import * as ReadableAPI from '../util/readableAPI';


const getCommentsForPost = (comments) => {
    return {
        type: GET_COMMENTS_FOR_POST,
        comments
    };
};

export const fetchCommentsForPost = (postId) => (dispatch) => {
    return ReadableAPI
        .getPostComments(postId)
        .then((comments) => dispatch(getCommentsForPost(comments)));
};

export const newComment = (comment) => {
    return {
        type: ADD_NEW_COMMENT,
        comment
    };
};

export const createComment = ({body, parent}) => dispatch => {
    return ReadableAPI
            .createComment(parent, body)
            .then(comment => dispatch(newComment(comment)));
};

