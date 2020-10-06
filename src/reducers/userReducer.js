import {ADD_USER} from "../actions/actionTypes";

const userReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_USER:
            return {
                ...state,
                userUid: action.user.uid,
                name: action.user.displayName
            }
        default:
            return state;
    }
}

export default userReducer;