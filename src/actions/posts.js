import { ADD_NEW_POST } from './index';

export function newPost(post={}){
    return {
        type: ADD_NEW_POST,
        payload: post
    }
}