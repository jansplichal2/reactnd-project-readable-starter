import {GET_ALL_CATEGORIES} from '../actions';
import _ from 'lodash';

export default function categories(state = {}, action) {
    switch (action.type) {
        case GET_ALL_CATEGORIES:
            const categories = _.mapKeys(action.categories, 'name')
            return {...state, ...categories};
        default:
            return state;
    }
}