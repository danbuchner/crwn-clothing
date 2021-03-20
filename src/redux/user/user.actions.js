/**
 * Actions creator are functions that return objects
 * Each object is in the correct format that the action is expecting to be
 */

export const setCurrentUser = user => ({
    type: 'SET_CURRENT_USER',
    payload: user
})