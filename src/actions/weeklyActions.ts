import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import {
  GET_WEEKLY,
  SET_ERROR,
  SET_LOADING,
  WeeklyAction,
  WeeklyData,
  WeatherError,
} from "../store/types";

export const getWeeklyWeather = (
  lat: number,
  lon: number
): ThunkAction<void, RootState, null, WeeklyAction> => {
  return async (dispatch) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=current,minutely,hourly,alerts&appid=89a68d32a3fe8c5b972de72f04dbc837`
      );

      if (!res.ok) {
        const resData: WeatherError = await res.json();
        throw new Error(resData.message);
      }

      const resData: WeeklyData = await res.json();
      dispatch({
        type: GET_WEEKLY,
        payload: resData,
      });
    } catch (err) {
      dispatch({
        type: SET_ERROR,
        payload: err.message,
      });
    }
  };
};

export const setLoading = (): WeeklyAction => {
  return {
    type: SET_LOADING,
  };
};

export const setError = (): WeeklyAction => {
  return {
    type: SET_ERROR,
    payload: "",
  };
};
