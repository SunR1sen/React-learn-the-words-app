import {FETCH_CARD_LIST, FETCH_CARD_LIST_REJECT, FETCH_CARD_LIST_RESOLVE} from "./actionTypes";

export const fetchCardList = (getData) => {
    return (dispatch, getState) => {
        dispatch(cardListAction());
        // getData().once('value').then(res => {
        //     dispatch(cardListResolveAction(res.val()));
        // }).catch(err => {
        //     dispatch(cardListRejectAction(err));
        // });
        getData().on('value', res => {
            const arr = Object.values(res.val() || {});
            dispatch(cardListResolveAction(arr));
        }, err => dispatch(cardListRejectAction(err)));
    }
}

export const cardListAction = () => ({
    type: FETCH_CARD_LIST
})

export const cardListResolveAction = (payload) => ({
    type: FETCH_CARD_LIST_RESOLVE,
    payload,
})

export const cardListRejectAction = (err) => ({
    type: FETCH_CARD_LIST_REJECT,
    err,
})