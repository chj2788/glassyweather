import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setAlert } from "./actions/alertActions";
import { setError } from "./actions/weatherActions";
import "./App.css";
import Alert from "./components/Alert";
import Appbar from "./components/Appbar";
import SearchBar from "./components/SearchBar";
import WeatherBoard from "./components/WeatherBoard";
import WeeklyWeather from "./components/WeeklyWeather";
import { RootState } from "./store";

const Wrapper = styled.div`
  background: #161623;
  min-height: 100vh;
`;

const App: FC = () => {
  const dispatch = useDispatch();
  const weatherData = useSelector((state: RootState) => state.weather.data);
  const weeklyData = useSelector((state: RootState) => state.weekly.data);
  const loading = useSelector((state: RootState) => state.weather.loading);
  const error = useSelector((state: RootState) => state.weather.error);
  const alertMsg = useSelector((state: RootState) => state.alert.message);

  return (
    <Wrapper className="App">
      <Appbar />
      <SearchBar />
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        weatherData && <WeatherBoard data={weatherData} />
      )}
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        weeklyData && <WeeklyWeather data={weeklyData} />
      )}
      {alertMsg && (
        <Alert message={alertMsg} onClose={() => dispatch(setAlert(""))} />
      )}
      {error && <Alert message={error} onClose={() => dispatch(setError())} />}
    </Wrapper>
  );
};

export default App;
