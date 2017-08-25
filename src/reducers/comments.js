import _ from 'lodash';
import { GET_COMMENTS_FOR_POST } from '../actions';

function comments (state = {}, action) {
    switch(action.type){
        case GET_COMMENTS_FOR_POST:
            return {..._.mapKeys(action.comments,'id')};
        default:
            return state;
    }
    return state;
}

export default comments;