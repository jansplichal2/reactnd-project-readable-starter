import { ADD_NEW_POST} from  '../actions';

function postReducer(state, action) {
    switch (action.type){
        case ADD_NEW_POST:
            return {
                ...state
            };
        default:
            return state;
    }
}

export default postReducer;