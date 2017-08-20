import { ADD_NEW_POST, GET_ALL_POSTS } from './index';
import * as ReadableAPI from '../util/readableAPI';

export function newPost(post={}){
    return {
        type: ADD_NEW_POST,
        payload: post
    }
}

export const getAllPosts = posts => ({
    type: GET_ALL_POSTS,
    posts
});

export const fetchAllPosts = () => dispatch => (
    ReadableAPI
        .getAllPosts()
        .then(posts => dispatch(getAllPosts(posts)))
);