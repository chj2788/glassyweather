import moment from "moment";
import React, { FC } from "react";
import styled from "styled-components";
import { WeeklyData } from "../store/types";
import Tilt from "react-parallax-tilt";
import { ReactComponent as DropIcon } from "../image/droplet-fill.svg";
import { ReactComponent as WindIcon } from "../image/wind.svg";
import { ReactComponent as HighIcon } from "../image/thermometer-high.svg";
import { ReactComponent as LowIcon } from "../image/thermometer-low.svg";
import { ReactComponent as RainIcon } from "../image/cloud-rain-heavy-fill.svg";
import { ReactComponent as DirIcon } from "../image/compass.svg";

import WindConverter from "../misc/WindConverter";
import InfiniteCarousel from "react-leaf-carousel";

interface WeeklyWeatherProps {
  data: WeeklyData;
}

const Wrapper = styled.div`
  /* display: flex;
  justify-content: center;
  align-items: center; */
  background: #161623;
  margin: 0 15%;
  padding: 3em 0;
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
  /* flex-wrap: wrap; */
  /* overflow-x: scroll;
  flex-wrap: nowrap; */
`;

const Card = styled(Tilt)`
  flex: 0 0 auto;
  /* position: relative; */
  width: 16em;
  height: 22em;
  /* margin: 0 20px; */
  box-shadow: 20px 20px 50px rgba(0, 0, 0, 0.5);
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.1);
  /* overflow: hidden; */
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid rgba(255, 255, 255, 0.5);
  border-left: 1px solid rgba(255, 255, 255, 0.5);
  /* transform-style: preserve-3d; */
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
  right: 10px;
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
  > * {
    margin-bottom: 5px;
  }
`;

const WeeklyWeather: FC<WeeklyWeatherProps> = ({ data }) => {
  console.log(data.daily[0].temp.min);
  return (
    <Wrapper>
      <InfiniteCarousel
        breakpoints={[
          {
            breakpoint: 900,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
            },
          },
          {
            breakpoint: 1500,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
            },
          },
        ]}
        dots={true}
        showSides={true}
        sidesOpacity={0.5}
        sideSize={0.1}
        slidesToScroll={4}
        slidesToShow={4}
        scrollOnDevice={true}
      >
        {/* <Container> */}
        {data.daily.map((day) => {
          const date = new Date(day.dt * 1000);
          const dateString = moment(date).format("DD");
          const weekDay = moment(date).format("dddd").substring(0, 3);
          return (
            <Card
              tiltMaxAngleX={25}
              tiltMaxAngleY={25}
              transitionSpeed={400}
              glareEnable={true}
              glareMaxOpacity={1}
            >
              <Content>
                <img
                  style={{
                    width: "15em",
                    position: "absolute",
                    opacity: "20%",
                    right: "40px",
                    top: "10px",
                  }}
                  src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                  alt=""
                />
                <Title>{dateString + " " + weekDay}</Title>
                <Heading>{day.weather[0].main}</Heading>
                <Description>
                  <div>
                    <LowIcon width="15px" height="15px" color="blue" />{" "}
                    {day.temp.min}
                    <sup>&#8451;</sup>
                    <HighIcon width="15px" height="15px" color="red" />
                    {day.temp.max}
                    <sup>&#8451;</sup>
                  </div>
                  <div>
                    <DropIcon width="15px" height="15px" color="skyblue" />
                    Humidity: {day.humidity}%
                  </div>
                  <div>
                    <RainIcon width="15px" height="15px" />
                    Chance of rain: {Math.ceil(day.pop * 100)}%
                  </div>
                  <div>
                    <WindIcon width="15" height="15" />
                    Wind: {day.wind_speed} m/s
                  </div>
                  <div>
                    <DirIcon width="15" height="15" />
                    Wind Direction: {WindConverter(day.wind_deg)}({day.wind_deg}
                    °)
                  </div>
                </Description>
              </Content>
            </Card>
          );
        })}
        {/* </Container> */}
      </InfiniteCarousel>
    </Wrapper>
  );
};

export default WeeklyWeather;
