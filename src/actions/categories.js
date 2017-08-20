import { GET_ALL_CATEGORIES } from './index';
import * as ReadableAPI from '../util/readableAPI';


export const getAllCategories = categories => ({
    type: GET_ALL_CATEGORIES,
    categories
});

export const fetchAllCategories = () => dispatch => (
    ReadableAPI
        .getAllCategories()
        .then(categories => dispatch(getAllCategories(categories)))
);