import { combineReducers} from "redux";
import userReducer from "./userReducer";
import countReducer from "./countReducer";
import cardListReducer from "./cardListReducer";

export default combineReducers({
    user: userReducer,
    counter: countReducer,
    cardList: cardListReducer,
})
