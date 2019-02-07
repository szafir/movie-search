import { createStore, applyMiddleware, compose } from "redux";
import searchReducer from "../reducers/searchReducer";
import thunk from "redux-thunk";
// import invariant from "redux-immutable-state-invariant";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  searchReducer,
  composeEnhancers(applyMiddleware(thunk /*, invariant()*/))
);

export default store;
