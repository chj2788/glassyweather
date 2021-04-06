import React, { FC, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { setAlert } from "../actions/alertActions";
import { getWeather, setLoading } from "../actions/weatherActions";

const SearchBar: FC = () => {
  const [city, setCity] = useState("");
  const dispatch = useDispatch();

  const changeHandler = (e: FormEvent<HTMLInputElement>) => {
    setCity(e.currentTarget.value);
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (city.trim() === "") {
      return dispatch(setAlert("City is required!"));
    }

    dispatch(setLoading());
    dispatch(getWeather(city));
    setCity("");
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={changeHandler}
        />
        <button>Search</button>
      </form>
    </div>
  );
};

export default SearchBar;
