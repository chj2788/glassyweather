import { FC, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { setAlert } from "../actions/alertActions";
import { getWeather, setLoading } from "../actions/weatherActions";

const Wrapper = styled.div`
  /* background: #350048; */
  /* background: #622d74; */
  background: #161623;
  padding-top: 7em;
  margin-bottom: 2em;
  @media only screen and (max-width: 550px) {
    padding-top: 5em;
    margin-bottom: 0;
  }
  /* display: flex; */
`;

const NeonButtonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const Letter = styled.div`
  @media only screen and (max-width: 550px) {
    font-size: 1em;
  }
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  letter-spacing: 1px;
  font-size: 1.1em;
  background: rgba(255, 255, 255, 0.05);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4em;
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
  @media only screen and (max-width: 550px) {
    width: 6em;
    height: 2em;
    margin: 0;
  }
  border: none;
  background: none;
  padding: none;
  position: relative;
  width: 8em;
  height: 3em;
  margin: 2em;
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
    width: 2em;
    height: 1em;
    background: #f7b8ff;
    box-shadow: 0 0 5px #f7b8ff, 0 0 15px #f7b8ff, 0 0 30px #f7b8ff,
      0 0 60px #f7b8ff;
    border-radius: 2em;
    transition: 0.2s;
    transition-delay: 0s;
  }
  &:hover::before {
    bottom: 0;
    height: 50%;
    width: 80%;
    border-radius: 4em;
    transition-delay: 0.2s;
  }
  &::after {
    content: "";
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: -5px;
    width: 2em;
    height: 1em;
    background: #f7b8ff;
    box-shadow: 0 0 5px #f7b8ff, 0 0 15px #f7b8ff, 0 0 30px #f7b8ff,
      0 0 60px #f7b8ff;
    border-radius: 2em;
    transition: 0.2s;
    transition-delay: 0s;
  }
  &:hover::after {
    top: 0;
    height: 50%;
    width: 80%;
    border-radius: 4em;
    transition-delay: 0.2s;
  }
  &:focus {
    outline: none;
  }
`;

const Input = styled.input`
  @media only screen and (max-width: 550px) {
    width: 8em;
    height: 2em;
    font-size: 1em;
    padding: 0.2em 2em;
  }
  width: 12em;
  height: 2em;
  margin: 2em 0;
  padding: 0.2em 4em;
  background: rgba(255, 255, 255, 0.05);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  border-right: 0px;
  border-left: 0px;
  border-radius: 30px;
  color: #fff;
  font-size: 1.1em;
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
    transition: 0.2s;
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
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
        </div>
      </form>
    </Wrapper>
  );
};

export default SearchBar;
