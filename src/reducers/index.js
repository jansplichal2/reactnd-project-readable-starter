import { combineReducers } from 'redux';
import comments from './comments';
import posts from './posts';
import { reducer as formReducer } from 'redux-form';

function categories (state = {}, action) {
    //console.log('Categories', state);
    return state;
}

export default combineReducers({
    comments,
    posts,
    categories,
    form: formReducer
});