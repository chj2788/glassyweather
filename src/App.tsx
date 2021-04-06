import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "./actions/alertActions";
import { setError } from "./actions/weatherActions";
import "./App.css";
import Alert from "./components/Alert";
import Appbar from "./components/Appbar";
import SearchBar from "./components/SearchBar";
import WeatherBoard from "./components/WeatherBoard";
import { RootState } from "./store";

const App: FC = () => {
  const dispatch = useDispatch();
  const weatherData = useSelector((state: RootState) => state.weather.data);
  const loading = useSelector((state: RootState) => state.weather.loading);
  const error = useSelector((state: RootState) => state.weather.error);
  const alertMsg = useSelector((state: RootState) => state.alert.message);

  return (
    <div className="App">
      <Appbar />
      <SearchBar />
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        weatherData && <WeatherBoard data={weatherData} />
      )}
      {alertMsg && (
        <Alert message={alertMsg} onClose={() => dispatch(setAlert(""))} />
      )}
      {error && <Alert message={error} onClose={() => dispatch(setError())} />}
    </div>
  );
};

export default App;
