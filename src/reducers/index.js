import { combineReducers } from "redux";
import cardsReducer from "./cardsReducer";
const reducer = combineReducers({
    cards: cardsReducer
})
export default reducer;