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

const Card = styled(Tilt)`
  position: relative;
  width: 230px;
  height: 350px;
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

const Content = styled.div`
  padding: 20px;
  text-align: center;
  /* transform: translateY(100px); */
  transform: translateZ(60px);
  /* opacity: 0; */
  /* transition: 0.5s; */
  /* &:hover {
    transform: translateY(0px);
    opacity: 1;
  } */
`;

const Title = styled.h1`
  position: absolute;
  right: 30px;
  top: -80px;
  font-size: 3em;
  color: rgba(255, 255, 255, 0.05);
  pointer-events: none;
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
        {/* <Card>
          <Content>
            <Description>

            </Description>
          </Content>
        </Card> */}
        <Card
          tiltMaxAngleX={25}
          tiltMaxAngleY={25}
          transitionSpeed={400}
          glareEnable={true}
          glareMaxOpacity={1}
        >
          <Content>
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
          </Content>
        </Card>
        <Card
          tiltMaxAngleX={25}
          tiltMaxAngleY={25}
          transitionSpeed={400}
          glareEnable={true}
          glareMaxOpacity={1}
        >
          <Content>
            <Title>Monday</Title>
            <Heading>Bright Shine</Heading>
            <Description>
              Temp: {data.main.temp}
              <sup>&#8451;</sup>
            </Description>
            <Description>Humidity: {data.main.humidity}</Description>
            <Description>Pressure: {data.main.pressure}</Description>
            <Description>Wind: {data.wind.speed}</Description>
          </Content>
        </Card>
        <Card
          tiltMaxAngleX={25}
          tiltMaxAngleY={25}
          transitionSpeed={400}
          glareEnable={true}
          glareMaxOpacity={1}
        >
          <Content>
            <Title>Monday</Title>
            <Heading>Bright Shine</Heading>
            <Description>
              Temp: {data.main.temp}
              <sup>&#8451;</sup>
            </Description>
            <Description>Humidity: {data.main.humidity}</Description>
            <Description>Pressure: {data.main.pressure}</Description>
            <Description>Wind: {data.wind.speed}</Description>
          </Content>
        </Card>
        <Card
          tiltMaxAngleX={25}
          tiltMaxAngleY={25}
          transitionSpeed={400}
          glareEnable={true}
          glareMaxOpacity={1}
        >
          <Content>
            <Title>Monday</Title>
            <Heading>Bright Shine</Heading>
            <Description>
              Temp: {celcius}
              <sup>&#8451;</sup>
            </Description>
            <Description>Humidity: {data.main.humidity}</Description>
            <Description>Pressure: {data.main.pressure}</Description>
            <Description>Wind: {data.wind.speed}</Description>
          </Content>
        </Card>
        <Card
          tiltMaxAngleX={25}
          tiltMaxAngleY={25}
          transitionSpeed={400}
          glareEnable={true}
          glareMaxOpacity={1}
        >
          <Content>
            <Title>Monday</Title>
            <Heading>Bright Shine</Heading>
            <Description>
              Temp: {celcius}
              <sup>&#8451;</sup>
            </Description>
            <Description>Humidity: {data.main.humidity}</Description>
            <Description>Pressure: {data.main.pressure}</Description>
            <Description>Wind: {data.wind.speed}</Description>
          </Content>
        </Card>
      </Container>
    </Wrapper>
  );
};

export default WeatherBoard;
