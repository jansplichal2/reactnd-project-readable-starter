import {ADD_NEW_POST, DELETE_POST, GET_ALL_POSTS, GET_POST} from './index';
import * as ReadableAPI from '../util/readableAPI';

const newPost = post => ({
    type: ADD_NEW_POST,
    post
});

const updatePost = post => ({
    type: GET_POST,
    post
});

const getPost = post => ({
    type: GET_POST,
    post
});

const deletePost = id => ({
    type: DELETE_POST,
    id
});

const getAllPosts = posts => ({
    type: GET_ALL_POSTS,
    posts
});

export const fetchAllPosts = () => dispatch => (
    ReadableAPI
        .getAllPosts()
        .then(posts => {
            dispatch(getAllPosts(posts));
            return posts.filter(post => !post.deleted).map(post => post.id);
        })
);

export const fetchPost = id => dispatch => (
    ReadableAPI
        .getPost(id)
        .then(post => dispatch(getPost(post)))
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
        .then(post => dispatch(deletePost(post.id)))
);

export const editPost = values => dispatch => (
    ReadableAPI.editPost(values)
        .then(post => dispatch(updatePost(post)))
);