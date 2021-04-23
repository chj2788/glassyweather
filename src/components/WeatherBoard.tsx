import { FC, useEffect } from "react";
import styled from "styled-components";
import { WeatherData } from "../store/types";
import { useDispatch } from "react-redux";
import { getWeeklyWeather } from "../actions/weeklyActions";
import SunnyRainDrop from "../image/sunny_raindrop.png";
import { ReactComponent as DropIcon } from "../image/droplet-fill.svg";
import { ReactComponent as WindIcon } from "../image/wind.svg";
import { ReactComponent as HighIcon } from "../image/thermometer-high.svg";
import { ReactComponent as LowIcon } from "../image/thermometer-low.svg";
import { ReactComponent as DirIcon } from "../image/compass.svg";
import { ReactComponent as SunriseIcon } from "../image/sunrise-fill.svg";
import { ReactComponent as SunsetIcon } from "../image/sunset-fill.svg";
import { ReactComponent as PressureIcon } from "../image/arrows-collapse.svg";

import WindConverter from "../misc/WindConverter";
import moment from "moment";

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
`;
const WeatherWrapper = styled.div`
  display: flex;
  /* flex-direction: "row"; */
  justify-content: center;
  align-items: flex-start;
`;

const TempWrapper = styled.div`
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin: 0 5%;
`;

const DescWrapper = styled.div`
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-top: 4%;
  > * {
    margin-bottom: 4%;
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
      <Title>Current Weather in {data.name}</Title>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <WeatherWrapper>
          <div>
            <img style={{ width: "10em" }} src={SunnyRainDrop} alt="" />
            <div style={{ color: "#fff", fontSize: "1.5em" }}>
              {data.weather[0].description}
            </div>
          </div>
          <TempWrapper>
            <div
              style={{
                color: "#fff",
                fontSize: "3em",
              }}
            >
              {data.main.temp}
              <sup>&#8451;</sup>
            </div>
            <div>
              Feels like {data.main.feels_like}
              <sup>&#8451;</sup>
            </div>
            <div
              style={{
                color: "#fff",
                fontSize: "1.5em",
                // marginTop: "40%",
              }}
            >
              <LowIcon height="0.5em" width="0.5em" color="blue" />
              {data.main.temp_min}
              <sup>&#8451;</sup>
              <HighIcon height="0.5em" width="0.5em" color="red" />
              {data.main.temp_max}
              <sup>&#8451;</sup>
            </div>
          </TempWrapper>
          <DescWrapper>
            <div>
              <DropIcon width="15" height="15" color="skyblue" /> Humidity:{" "}
              {data.main.humidity} %
            </div>
            <div>
              <WindIcon width="15" height="15" /> Wind: {data.wind.speed} m/s
            </div>
            <div>
              <DirIcon width="15" height="15" /> Wind Direction:{" "}
              {WindConverter(data.wind.deg)}({data.wind.deg}
              °)
            </div>
            <div>
              <PressureIcon width="15" height="15" /> Pressure:{" "}
              {data.main.pressure} hPa
            </div>
            <div>
              <SunriseIcon width="15" height="15" color="red" /> Sunrise:{" "}
              {dateConverter(data.sys.sunrise)}
            </div>
            <div>
              <SunsetIcon width="15" height="15" color="navy" /> Sunset:{" "}
              {dateConverter(data.sys.sunset)}
            </div>
          </DescWrapper>
        </WeatherWrapper>
      </div>
    </Wrapper>
  );
};

export default WeatherBoard;
