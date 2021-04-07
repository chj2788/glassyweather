import {
  GET_WEEKLY,
  SET_ERROR,
  SET_LOADING,
  WeeklyAction,
  WeeklyState,
} from "../store/types";

const initialState: WeeklyState = {
  data: null,
  loading: false,
  error: "",
};

export default (state = initialState, action: WeeklyAction): WeeklyState => {
  switch (action.type) {
    case GET_WEEKLY:
      return {
        data: action.payload,
        loading: false,
        error: "",
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SET_ERROR: {
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    }
    default:
      return state;
  }
};
