import {MINUS, PLUS} from "./actionTypes";

export const plusAction = (amount) => {
    return {
        type: PLUS,
        payload: amount
    }
}

export const minusAction = (amount) => {
    return {
        type: MINUS,
        payload: amount
    }
}