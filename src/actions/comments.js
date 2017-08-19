import { ADD_NEW_COMMENT, DELETE_COMMENT } from './index';

export function newComment(comment={}){
    return {
        type: ADD_NEW_COMMENT,
        payload: comment
    }
}


export function deleteComment( {id} ){
    return {
        type: DELETE_COMMENT,
        payload: id
    }
}