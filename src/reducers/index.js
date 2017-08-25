import { combineReducers } from 'redux';
import comments from './comments';
import posts from './posts';
import categories from './categories';
import { reducer as formReducer } from 'redux-form';



export default combineReducers({
    comments,
    posts,
    categories,
    form: formReducer
});