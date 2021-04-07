import { FC } from "react";
import styled from "styled-components";
import { WeatherData } from "../store/types";
import Tilt from "react-parallax-tilt";
import { useDispatch } from "react-redux";
import { getWeeklyWeather } from "../actions/weeklyActions";

interface WeatherBoardProps {
  data: WeatherData;
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #161623;
  /* &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(#ffffff, #6624ff);
    clip-path: circle(30% at right 70%);
  }
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(#32a0fa, #e91e63);
    clip-path: circle(20% at 10% 10%);
  } */
`;

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 90%;
  margin: 2em 0;
  flex-wrap: wrap;
  z-index: 1;
`;

const Title = styled.h1`
  font-size: 3.2em;
  color: #fff;
`;

const Heading = styled.h3`
  font-size: 1.8em;
  color: #fff;
  z-index: 1;
`;

const Description = styled.p`
  font-size: 1em;
  color: #fff;
  font-weight: 300;
`;

const WeatherBoard: FC<WeatherBoardProps> = ({ data }) => {
  // const fahrenheit = (data.main.temp * 1.8 - 459.67).toFixed(2);
  const celcius = (data.main.temp - 273.15).toFixed(2);
  const dispatch = useDispatch();
  let { lat, lon } = data.coord;
  dispatch(getWeeklyWeather(lat, lon));
  return (
    <Wrapper>
      <Container>
        <Title>
          {data.name} - {data.sys.country}
        </Title>

        <Heading>
          {data.weather[0].description}
          {/* <img
                src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
                alt=""
              /> */}
        </Heading>
        {/* <p>
                {fahrenheit}
                <sup>&#8457;</sup>
              </p> */}
        <Description>
          Temp: {data.main.temp}
          <sup>&#8451;</sup>
        </Description>
        <Description>
          Max / Min: {data.main.temp_max} / {data.main.temp_min}
        </Description>
        <Description>Humidity: {data.main.humidity}</Description>
        <Description>Pressure: {data.main.pressure}</Description>
        <Description>Wind: {data.wind.speed}</Description>
      </Container>
    </Wrapper>
  );
};

export default WeatherBoard;
