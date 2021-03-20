/**
 * Actions creator are functions that return objects
 * Each object is in the correct format that the action is expecting to be
 */

import { UserActionTypes } from './user.types';

export const setCurrentUser = user => ({
    type: UserActionTypes.SET_CURRENT_USER,
    payload: user
})