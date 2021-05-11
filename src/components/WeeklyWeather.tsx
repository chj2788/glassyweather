import moment from "moment";
import { FC } from "react";
import styled from "styled-components";
import { WeeklyData } from "../store/types";
import Tilt from "react-parallax-tilt";
import { ReactComponent as WindIcon } from "../image/wind.svg";
import { ReactComponent as HighIcon } from "../image/thermometer-high.svg";
import { ReactComponent as LowIcon } from "../image/thermometer-low.svg";
import { ReactComponent as RainIcon } from "../image/cloud-rain-heavy-fill.svg";
import { ReactComponent as DirIcon } from "../image/compass.svg";
import { ReactComponent as HumIcon } from "../image/humidity.svg";
import WindConverter from "../misc/WindConverter";
import InfiniteCarousel from "react-leaf-carousel";
import IconConverter from "../misc/IconConverter";

interface WeeklyWeatherProps {
  data: WeeklyData;
}

const Wrapper = styled.div`
  background: #161623;
  margin: 0 15%;
  padding: 3em 0;
  @media only screen and (max-width: 550px) {
    padding: 0;
  }
`;

const Card = styled(Tilt)`
  @media only screen and (max-width: 550px) {
    width: 11em;
    height: 17em;
  }
  flex: 0 0 auto;
  width: 14em;
  height: 20em;
  box-shadow: 20px 20px 50px rgba(0, 0, 0, 0.5);
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid rgba(255, 255, 255, 0.5);
  border-left: 1px solid rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(5px);
`;

const Content = styled.div`
  padding: 20px;
  text-align: center;
`;

const TodayTitle = styled.h1`
  position: absolute;
  right: 10px;
  top: -30px;
  font-size: 3.2em;
  color: rgba(255, 255, 255, 0.226);
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.226),
    0 0 20px rgba(255, 255, 255, 0.226), 0 0 40px rgba(255, 255, 255, 0.226),
    0 0 80px rgba(255, 255, 255, 0.226), 0 0 120px rgba(255, 255, 255, 0.226),
    0 0 160px rgba(255, 255, 255, 0.226);
  pointer-events: none;
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
  font-size: 1.1em;
  color: #fff;
  > * {
    margin-bottom: 8%;
  }
  @media only screen and (max-width: 550px) {
    font-size: 1em;
    > * {
      margin-bottom: 5%;
    }
  }
`;

const Image = styled.img`
  width: 9em;
  position: absolute;
  opacity: 10%;
  right: 0;
  top: 60px;
  @media only screen and (max-width: 550px) {
    width: 4em;
  }
`;

const WeeklyWeather: FC<WeeklyWeatherProps> = ({ data }) => {
  console.log(data.daily[0].temp.min);
  return (
    <Wrapper>
      <InfiniteCarousel
        breakpoints={[
          {
            breakpoint: 715,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 1050,
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
        {data.daily.map((day, idx) => {
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
              glareBorderRadius="15px"
            >
              <Content>
                <Image src={IconConverter(day.weather[0].icon)} alt="" />
                {idx === 0 ? (
                  <TodayTitle>{dateString + " " + weekDay}</TodayTitle>
                ) : (
                  <Title>{dateString + " " + weekDay}</Title>
                )}
                <Heading>{day.weather[0].main}</Heading>
                <Description>
                  <div>
                    <LowIcon width="15px" height="15px" color="blue" />{" "}
                    {day.temp.min.toFixed(0)}
                    <sup>&#8451;</sup>
                    <HighIcon width="15px" height="15px" color="red" />
                    {day.temp.max.toFixed(0)}
                    <sup>&#8451;</sup>
                  </div>
                  <div>
                    <RainIcon width="15px" height="15px" />{" "}
                    {Math.ceil(day.pop * 100)}%
                  </div>
                  <div>
                    <HumIcon width="18px" height="18px" /> {day.humidity}%
                  </div>
                  <div>
                    <WindIcon width="15" height="15" /> {day.wind_speed} m/s
                  </div>
                  <div>
                    <DirIcon width="15" height="15" />{" "}
                    {WindConverter(day.wind_deg)}({day.wind_deg}
                    °)
                  </div>
                </Description>
              </Content>
            </Card>
          );
        })}
      </InfiniteCarousel>
    </Wrapper>
  );
};

export default WeeklyWeather;
