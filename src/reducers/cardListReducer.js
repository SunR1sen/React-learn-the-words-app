import {FETCH_CARD_LIST, FETCH_CARD_LIST_REJECT, FETCH_CARD_LIST_RESOLVE} from "../actions/actionTypes";

const cardListReducer = (state = {items: [], err: null, isBusy: false}, action) => {
    switch (action.type) {
        case FETCH_CARD_LIST:
            return {
                items: [],
                err: null,
                isBusy: true,
            }

        case FETCH_CARD_LIST_RESOLVE:
            return {
                items: action.payload,
                err: null,
                isBusy: false,
            }

        case FETCH_CARD_LIST_REJECT:
            return {
                items: null,
                err: action.err,
                isBusy: false,
            }

        default:
            return state;
    }
}

export default cardListReducer;