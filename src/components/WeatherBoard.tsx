import { FC, useEffect } from "react";
import styled from "styled-components";
import { WeatherData } from "../store/types";
import { useDispatch } from "react-redux";
import { getWeeklyWeather } from "../actions/weeklyActions";
import { ReactComponent as WindIcon } from "../image/wind.svg";
import { ReactComponent as HighIcon } from "../image/thermometer-high.svg";
import { ReactComponent as LowIcon } from "../image/thermometer-low.svg";
import { ReactComponent as DirIcon } from "../image/compass.svg";
import { ReactComponent as SunriseIcon } from "../image/sunrise-fill.svg";
import { ReactComponent as SunsetIcon } from "../image/sunset-fill.svg";
import { ReactComponent as PressureIcon } from "../image/arrows-collapse.svg";
import { ReactComponent as HumIcon } from "../image/humidity.svg";

import WindConverter from "../misc/WindConverter";
import moment from "moment";
import IconConverter from "../misc/IconConverter";

interface WeatherBoardProps {
  data: WeatherData;
}

const Wrapper = styled.div`
  margin: 0 15%;
  padding: 2em 0;
  box-shadow: 20px 20px 50px rgba(0, 0, 0, 0.5);
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.1);
  border-top: 1px solid rgba(255, 255, 255, 0.5);
  border-left: 1px solid rgba(255, 255, 255, 0.5);
  transform-style: preserve-3d;
  backdrop-filter: blur(5px);
`;

const Title = styled.div`
  color: #fff;
  font-size: 2em;
  font-weight: 500;
  text-shadow: 0 0 10px white, 0 0 20px white, 0 0 40px white, 0 0 80px white,
    0 0 120px white, 0 0 160px white;
  @media only screen and (max-width: 660px) {
    display: none;
  }
`;
const SmallTitle = styled.div`
  color: #fff;
  font-size: 2em;
  font-weight: 500;
  text-shadow: 0 0 10px white, 0 0 20px white, 0 0 40px white, 0 0 80px white,
    0 0 120px white, 0 0 160px white;
  font-size: 1.5em;
  @media only screen and (min-width: 661px) {
    display: none;
  }
`;

const BoardWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const WeatherWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: fit-content;
  margin: 4% 0;
`;

const WeatherDescription = styled.div`
  color: #fff;
  font-size: 1.5em;
  @media only screen and (max-width: 800px) {
    font-size: 1em;
  }
`;

const TempWrapper = styled.div`
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin: 0 8%;
  width: 15em;
  @media only screen and (max-width: 550px) {
    width: 7.5em;
    margin: 0;
  }
`;

const DescWrapper = styled.div`
  font-size: 1.1em;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 12rem;
  margin-top: 4%;
  > * {
    margin-bottom: 6%;
  }
  @media only screen and (max-width: 800px) {
    display: none;
  }
`;
const Image = styled.img`
  width: 10em;
  @media only screen and (max-width: 550px) {
    width: 5em;
  }
`;

const MainTemp = styled.div`
  color: #fff;
  font-size: 3em;
  @media only screen and (max-width: 550px) {
    font-size: 2em;
  }
`;

const FeelsLike = styled.div`
  margin-bottom: 45%;
  @media only screen and (max-width: 550px) {
    margin-bottom: 10%;
  }
`;

const HighLowWrapper = styled.div`
  color: #fff;
  font-size: 1.5em;
  @media only screen and (max-width: 800px) {
    font-size: 1em;
  }
`;

const WeatherBoard: FC<WeatherBoardProps> = ({ data }) => {
  // const fahrenheit = (data.main.temp * 1.8 - 459.67).toFixed(2);
  // const celcius = (data.main.temp - 273.15).toFixed(2);
  const dispatch = useDispatch();
  let { lat, lon } = data.coord;
  useEffect(() => {
    dispatch(getWeeklyWeather(lat, lon));
  }, [lat, lon, dispatch]);

  const dateConverter = (date: number) => {
    const convDate = new Date(date * 1000);
    return moment(convDate).format("h:mm a");
  };

  return (
    <Wrapper>
      <Title>
        Current Weather in {data.name}, {data.sys.country}
      </Title>
      <SmallTitle>
        {data.name}, {data.sys.country}
      </SmallTitle>
      <BoardWrapper>
        <WeatherWrapper>
          <div style={{ marginLeft: "8%" }}>
            <Image src={IconConverter(data.weather[0].icon)} alt="" />
            <WeatherDescription>
              {data.weather[0].description}
            </WeatherDescription>
          </div>
          <TempWrapper>
            <MainTemp>
              {data.main.temp.toFixed(1)}
              <sup>&#8451;</sup>
            </MainTemp>
            <FeelsLike>
              Feels like {data.main.feels_like.toFixed(1)}
              <sup>&#8451;</sup>
            </FeelsLike>
            <HighLowWrapper>
              <LowIcon height="0.5em" width="0.5em" color="blue" />
              {data.main.temp_min.toFixed(1)}
              <sup>&#8451;</sup>
              <HighIcon height="0.5em" width="0.5em" color="red" />
              {data.main.temp_max.toFixed(1)}
              <sup>&#8451;</sup>
            </HighLowWrapper>
          </TempWrapper>
          <DescWrapper>
            <div>
              <HumIcon width="18px" height="18px" />{" "}
              {data.main.humidity.toFixed(1)} %
            </div>
            <div>
              <WindIcon width="15" height="15" /> {data.wind.speed.toFixed(1)}{" "}
              m/s
            </div>
            <div>
              <DirIcon width="15" height="15" /> {WindConverter(data.wind.deg)}(
              {data.wind.deg}
              °)
            </div>
            <div>
              <PressureIcon width="15" height="15" /> {data.main.pressure} hPa
            </div>
            <div>
              <SunriseIcon width="15" height="15" color="red" />{" "}
              {dateConverter(data.sys.sunrise)}
            </div>
            <div>
              <SunsetIcon width="15" height="15" color="navy" />{" "}
              {dateConverter(data.sys.sunset)}
            </div>
          </DescWrapper>
        </WeatherWrapper>
      </BoardWrapper>
    </Wrapper>
  );
};

export default WeatherBoard;
