import { FC } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: black;
  padding: 0.1em 0;
`;

const NeonTitle = styled.span`
  transition: 0.5;
`;

const TitleWrapper = styled.h1`
  font-family: "Poppins", sans-serif;
  font-size: 2.5em;
  color: white;
  cursor: pointer;
  &:hover ${NeonTitle} {
    margin-right: 10px;
    /* letter-spacing: 5px; */
  }
  &:hover ${NeonTitle} {
    color: white;
    text-shadow: 0 0 10px white, 0 0 20px white, 0 0 40px white, 0 0 80px white,
      0 0 120px white, 0 0 160px white;
  }
`;

const Appbar: FC = () => {
  return (
    <Wrapper>
      <TitleWrapper>
        <NeonTitle>Glassy</NeonTitle>Weather
      </TitleWrapper>
    </Wrapper>
  );
};

export default Appbar;
