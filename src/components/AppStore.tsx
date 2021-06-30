import { createStore, combineReducers } from "redux";
import { appReducer } from "./AppReducers";

const reducers = {
  appReducer: appReducer
};
const rootReducer = combineReducers(reducers);
export const configureStore = () => createStore(rootReducer);
