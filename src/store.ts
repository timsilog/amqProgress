import { createStore, applyMiddleware/*, compose*/ } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { composeWithDevTools } from 'redux-devtools-extension';

const middleware = [thunk];
// const initialState: any = {};
// const store = createStore(
//   rootReducer,
//   initialState,
//   compose(
//     applyMiddleware(...middleware),
//     (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
//   )
// );
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
)
export default store;