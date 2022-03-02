import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";

import rootReducer from "./root.reducer";
import thunk from "redux-thunk";
const middlewares = [thunk, logger];

// if (process.env.NODE_ENV === "development") {
//   middlewares.push(logger);
// }

const store = createStore(rootReducer, applyMiddleware(...middlewares));

console.log(store);
export default store;
