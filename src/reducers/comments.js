import _ from 'lodash';
import {ADD_NEW_COMMENT, GET_COMMENT, GET_COMMENTS_FOR_POST, DELETE_COMMENT} from '../actions';

function comments(state = {}, action) {
    switch (action.type) {
        case GET_COMMENTS_FOR_POST:
            const activeComments = action.comments.filter(comment => (!comment.deleted || !comment.parentDeleted));
            return {..._.mapKeys(activeComments, 'id')};
        case ADD_NEW_COMMENT:
            return {...state, [action.comment.id]: action.comment};
        case GET_COMMENT:
            return {...state, [action.comment.id]: action.comment};
        case DELETE_COMMENT:
            return _.omit(state, action.id);
        default:
            return state;
    }
}

export default comments;