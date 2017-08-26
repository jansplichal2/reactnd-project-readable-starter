import _ from 'lodash';
import {ADD_NEW_COMMENT, GET_COMMENT, GET_COMMENTS_FOR_POST} from '../actions';

function comments(state = {}, action) {
    switch (action.type) {
        case GET_COMMENTS_FOR_POST:
            return {..._.mapKeys(action.comments, 'id')};
        case ADD_NEW_COMMENT:
            return {...state, [action.comment.id]: action.comment};
        case GET_COMMENT:
            return {...state, [action.comment.id]: action.comment};
        default:
            return state;
    }
}

export default comments;