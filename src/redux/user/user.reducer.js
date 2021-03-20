/**
 * It will contain all the state related to user
 * A reducer it's a function that have two properties state and action
 * Action is an object with properties type and payload
 */
import { UserActionTypes } from './user.types';

// Sets a initial state
const INITIAL_STATE = {
    currentUser: null
}

const userReducer = (state = INITIAL_STATE, action) => {
    // action - is something that the reducestore pass to the reducer
    // state - is the properties passed when the action gets fired

    switch(action.type){
        case UserActionTypes.SET_CURRENT_USER:
            // when setting the current user state
            return{
                ...state,
                currentUser: action.payload
            };
        default: return state;
    }
};

export default userReducer;