import moment from "moment";
import React, { FC } from "react";
import styled from "styled-components";
import { WeeklyData } from "../store/types";
import Tilt from "react-parallax-tilt";

interface WeeklyWeatherProps {
  data: WeeklyData;
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
  width: 250px;
  height: 370px;
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
  /* transform: translateY(100px);
  transform: translateZ(60px); */
  /* opacity: 0; */
  /* transition: 0.5s; */
  /* &:hover {
    transform: translateY(0px);
    opacity: 1;
  } */
`;

const Title = styled.h1`
  position: absolute;
  right: -3px;
  top: -30px;
  font-size: 3.2em;
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

const WeeklyWeather: FC<WeeklyWeatherProps> = ({ data }) => {
  return (
    <Wrapper>
      <Container>
        {data.daily.map((day) => {
          const date = new Date(day.dt * 1000);
          const dateString = moment(date).format("YYYY-MM-DD");
          const weekDay = moment(date).format("dddd");
          return (
            <Card
              tiltMaxAngleX={25}
              tiltMaxAngleY={25}
              transitionSpeed={400}
              glareEnable={true}
              glareMaxOpacity={1}
            >
              <Content>
                <Title>{weekDay}</Title>
                <Heading>{day.weather[0].description}</Heading>
                <Description>{dateString}</Description>
                <Description>MinTemp: {day.temp.min}</Description>
                <Description>MaxTemp: {day.temp.max}</Description>
                <Description>Humidity: {day.humidity}</Description>
              </Content>
            </Card>
          );
        })}
      </Container>
    </Wrapper>
  );
};

export default WeeklyWeather;
