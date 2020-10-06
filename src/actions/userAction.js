import {ADD_USER} from "./actionTypes";

export const addUserAction = (user) => ({
    type: ADD_USER,
    user,
})