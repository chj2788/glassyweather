import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import alertReducer from "../reducers/alertReducer";
import weatherReducer from "../reducers/weatherReducer";
import weeklyReducer from "../reducers/weeklyReducer";

const rootReducer = combineReducers({
  weather: weatherReducer,
  weekly: weeklyReducer,
  alert: alertReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export type RootState = ReturnType<typeof rootReducer>;

export default store;
