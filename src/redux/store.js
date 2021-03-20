import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';

import rootReducer from './root-reducer';

/**
 * Middleware are function that receive actions as parameters
 * and pas the result out to the root reducer
 */

// Middleware array
const middlewares = [logger];

// It will spread in all the middlewares into the function
const store = createStore(rootReducer,applyMiddleware(...middlewares));

export default store;