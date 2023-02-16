import { applyMiddleware, combineReducers } from "redux";
import { legacy_createStore as createStore } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducers/images.js";

const rootReducer = combineReducers({
  imageState: reducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
