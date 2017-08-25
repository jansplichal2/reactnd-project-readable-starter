import _ from 'lodash';
import { GET_ALL_POSTS, ADD_NEW_POST } from '../actions';

function posts (state = {}, action) {
    switch (action.type){
        case GET_ALL_POSTS:
            const posts = _.mapKeys(action.posts, 'id');
            return {...state, ...posts};
        case ADD_NEW_POST:
            //console.log(action.post);
            return {...state, [action.post.id]: action.post};
        default:
            return state;
    }
    return state;
}

export default posts;