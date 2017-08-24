import { ADD_NEW_COMMENT, DELETE_COMMENT, GET_COMMENTS_FOR_POST } from './index';
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

