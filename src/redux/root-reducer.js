/**
 * Root reducer is the base object 
 * that represents the state of the application
 * 
 * It also contains all individual reducer for 
 * the individual functionalities and components across the app
 * 
 * March 19,2021
 */

import {combineReducers} from 'redux';

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';

// Combines and export all reducers
export default combineReducers({
    user: userReducer,
    cart:cartReducer
});