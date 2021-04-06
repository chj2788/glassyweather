import React, { FC } from "react";
import { WeatherData } from "../store/types";

interface WeatherBoardProps {
  data: WeatherData;
}
const WeatherBoard: FC<WeatherBoardProps> = ({ data }) => {
  const fahrenheit = (data.main.temp * 1.8 - 459.67).toFixed(2);
  const celcius = (data.main.temp - 273.15).toFixed(2);
  return (
    <section>
      <div>
        <h1>
          {data.name} - {data.sys.country}
        </h1>
        <div>
          <p>{data.weather[0].description}</p>
          <p>
            <img
              src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
              alt=""
            />
          </p>
        </div>
      </div>
      <div>
        <p>temp</p>
        <div>
          <p>{data.main.temp}K</p>
          <p>
            {fahrenheit}
            <sup>&#8457;</sup>
          </p>
          <p>
            {celcius}
            <sup>&#8451;</sup>
          </p>
        </div>
      </div>
      <div>
        <p>humidty</p>
        <p>{data.main.humidity}</p>
      </div>
      <div>
        <p>Pressure</p>
        <p>{data.main.pressure}</p>
      </div>
      <div>
        <p>Wind</p>
        <p>{data.wind.speed}</p>
      </div>
    </section>
  );
};

export default WeatherBoard;
