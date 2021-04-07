import React, { FC } from "react";
import styled from "styled-components";
import { WeeklyData } from "../store/types";

interface WeeklyWeatherProps {
  data: WeeklyData;
}

const Temp = styled.div`
  background-color: red;
  padding: 2em;
`;

const WeeklyWeather: FC<WeeklyWeatherProps> = ({ data }) => {
  console.log(new Date(data.daily[0].dt * 1000));
  return (
    <div>
      {data.daily.map((day) => {
        return (
          <Temp>
            {/* <p>Time: {new Date(day.dt * 1000)}</p> */}
            <p>Weather: {day.weather[0].description}</p>
            <p>MinTemp: {day.temp.min}</p>
            <p>MaxTemp: {day.temp.max}</p>
            <p>Humidity: {day.humidity}</p>
          </Temp>
        );
      })}
      <Temp>Hello</Temp>
    </div>
  );
};

export default WeeklyWeather;
