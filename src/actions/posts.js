import { ADD_NEW_POST, GET_ALL_POSTS, GET_POST, DELETE_POST } from './index';
import * as ReadableAPI from '../util/readableAPI';

export function newPost(post){
    return {
        type: ADD_NEW_POST,
        post
    }
}

export function updatePost(post){
    return {
        type: GET_POST,
        post
    }
}

const deletePost = (id) => {
    return {
        type: DELETE_POST,
        id
    };
};

export const getAllPosts = posts => ({
    type: GET_ALL_POSTS,
    posts
});

export const fetchAllPosts = () => dispatch => (
    ReadableAPI
        .getAllPosts()
        .then(posts => dispatch(getAllPosts(posts)))
);

export const createPost = values => dispatch => (
  ReadableAPI
      .createPost(values)
      .then(post => dispatch(newPost(post)))
);

export const upVote = id => dispatch => (
  ReadableAPI.upVotePost(id)
      .then(post => dispatch(updatePost(post)))
);

export const downVote = id => dispatch => (
    ReadableAPI.downVotePost(id)
        .then(post => dispatch(updatePost(post)))
);

export const removePost = id => dispatch => (
    ReadableAPI.removePost(id)
        .then(post => dispatch(deletePost(post)))
);