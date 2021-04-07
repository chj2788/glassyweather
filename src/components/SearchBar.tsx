import { FC, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { setAlert } from "../actions/alertActions";
import { getWeather, setLoading } from "../actions/weatherActions";

const Wrapper = styled.div`
  /* background: #350048; */
  /* background: #622d74; */
  background: #161623;
`;

const NeonButtonWrapper = styled.span`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const Letter = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  letter-spacing: 1px;
  font-size: 18px;
  background: rgba(255, 255, 255, 0.05);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 30px;
  color: #fff;
  z-index: 1;
  font-weight: 400;
  overflow: hidden;
  transition: 0.5s;
  backdrop-filter: blur(15px);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    background: linear-gradient(
      to left,
      rgba(255, 255, 255, 0.15),
      transparent
    );
    transform: skewX(45deg) translateX(0);
  }
`;

const NeonButton = styled.button`
  border: none;
  background: none;
  padding: none;
  position: relative;
  width: 155px;
  height: 50px;
  margin: 20px;
  &:hover ${Letter} {
    letter-spacing: 3px;
  }
  &:hover ${Letter}::before {
    transform: skewX(45deg) translateX(200%);
  }
  &::before {
    content: "";
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: -5px;
    width: 30px;
    height: 10px;
    background: #f7b8ff;
    box-shadow: 0 0 5px #f7b8ff, 0 0 15px #f7b8ff, 0 0 30px #f7b8ff,
      0 0 60px #f7b8ff;
    border-radius: 10px;
    transition: 0.5s;
    transition-delay: 0s;
  }
  &:hover::before {
    bottom: 0;
    height: 50%;
    width: 80%;
    border-radius: 30px;
    transition-delay: 0.5s;
  }
  &::after {
    content: "";
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: -5px;
    width: 30px;
    height: 10px;
    background: #f7b8ff;
    box-shadow: 0 0 5px #f7b8ff, 0 0 15px #f7b8ff, 0 0 30px #f7b8ff,
      0 0 60px #f7b8ff;
    border-radius: 10px;
    transition: 0.5s;
    transition-delay: 0s;
  }
  &:hover::after {
    top: 0;
    height: 50%;
    width: 80%;
    border-radius: 30px;
    transition-delay: 0.5s;
  }
  &:focus {
    outline: none;
  }
`;

const Input = styled.input`
  width: 250px;
  height: 50px;
  margin: 30px 0;
  padding: 0 50px;
  background: rgba(255, 255, 255, 0.05);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  border-right: 0px;
  border-left: 0px;
  border-radius: 30px;
  color: #fff;
  font-size: 25px;
  text-align: center;

  &:focus {
    outline: none;
    /* background: linear-gradient(
      to left,
      rgba(255, 255, 255, 0.15),
      transparent
    ); */
    /* background: #f7b8ff; */
    box-shadow: 0 0 3px #f7b8ff, 0 0 9px #f7b8ff, 0 0 18px #f7b8ff,
      0 0 40px #f7b8ff;
    border-radius: 30px;
    transition: 0.5s;
    transition-delay: 0s;
  }
`;

const SearchBar: FC = () => {
  const [city, setCity] = useState("");
  const dispatch = useDispatch();

  const changeHandler = (e: FormEvent<HTMLInputElement>) => {
    setCity(e.currentTarget.value);
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (city.trim() === "") {
      return dispatch(setAlert("City is required!"));
    }

    dispatch(setLoading());
    dispatch(getWeather(city));
    setCity("");
  };

  return (
    <Wrapper>
      <form onSubmit={submitHandler}>
        <Input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={changeHandler}
        />
        <NeonButtonWrapper>
          <NeonButton role="button">
            <Letter>Search</Letter>
          </NeonButton>
        </NeonButtonWrapper>
      </form>
    </Wrapper>
  );
};

export default SearchBar;
