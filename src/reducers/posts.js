import _ from 'lodash';
import { GET_ALL_POSTS, ADD_NEW_POST, GET_POST, DELETE_POST } from '../actions';

function posts (state = {}, action) {
    switch (action.type){
        case GET_ALL_POSTS:
            const activePosts = action.posts.filter(post => !post.deleted);
            const posts = _.mapKeys(activePosts, 'id');
            return {...state, ...posts};
        case ADD_NEW_POST:
            return {...state, [action.post.id]: action.post};
        case GET_POST:
            return {...state, [action.post.id]: action.post};
        case DELETE_POST:
            return _.omit(state, action.id);
        default:
            return state;
    }
}

export default posts;