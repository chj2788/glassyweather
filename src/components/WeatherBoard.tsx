import { FC, useEffect } from "react";
import styled from "styled-components";
import { WeatherData } from "../store/types";
import Tilt from "react-parallax-tilt";
import { useDispatch } from "react-redux";
import { getWeeklyWeather } from "../actions/weeklyActions";
import SunnyRainDrop from "../image/sunny_raindrop.png";

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

const Card = styled.div`
  position: relative;
  width: 250px;
  height: 200px;
  margin: 20px;
  box-shadow: 20px 20px 50px rgba(0, 0, 0, 0.5);
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.1);
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid rgba(255, 255, 255, 0.5);
  border-left: 1px solid rgba(255, 255, 255, 0.5);
  transform-style: preserve-3d;
  backdrop-filter: blur(5px);
`;

const Container = styled.div`
  display: grid;
  position: relative;
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
  grid-column: 3/4;
  grid-row: 1/1;
`;

const Heading = styled.h3`
  font-size: 1.8em;
  color: #fff;
  z-index: 1;
  grid-column: 1/3;
  grid-row: 2/3;
`;

const Description = styled.p`
  font-size: 1.5em;
  color: #fff;
  font-weight: 300;
  grid-column: 3/4;
  grid-row: 2/3;
`;

const Image = styled.img`
  grid-column: 1/3;
  grid-row: 1/2;
  width: 20em;
`;

const WeatherBoard: FC<WeatherBoardProps> = ({ data }) => {
  // const fahrenheit = (data.main.temp * 1.8 - 459.67).toFixed(2);
  // const celcius = (data.main.temp - 273.15).toFixed(2);
  const dispatch = useDispatch();
  let { lat, lon } = data.coord;
  dispatch(getWeeklyWeather(lat, lon));
  return (
    <Wrapper>
      <Container>
        <Image src={SunnyRainDrop} alt="" />
        <Title>
          <div>
            {data.name} - {data.sys.country}
          </div>
          <div>
            {data.main.temp}
            <sup>&#8451;</sup>
          </div>
        </Title>
        <Heading>
          <div>{data.weather[0].description}</div>
          <div>
            {data.main.temp_max}
            <sup>&#8451;</sup> / {data.main.temp_min}
            <sup>&#8451;</sup>
          </div>
        </Heading>
        <Card>
          <Description>
            <div>
              Feels like: {data.main.feels_like}
              <sup>&#8451;</sup>
            </div>
            <div>Humidity: {data.main.humidity}</div>
            <div>Pressure: {data.main.pressure}</div>
            <div>Wind: {data.wind.speed}</div>
          </Description>
        </Card>
      </Container>
    </Wrapper>
  );
};

export default WeatherBoard;
