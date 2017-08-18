import { ADD_NEW_COMMENT } from './index';

export function newComment(comment={}){
    return {
        type: ADD_NEW_COMMENT,
        payload: comment
    }
}