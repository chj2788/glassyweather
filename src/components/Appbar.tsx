import { FC } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: black;
  overflow: hidden;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 2;
`;

const NeonTitle = styled.span`
  transition: 0.5;
`;

const TitleWrapper = styled.h1`
  font-family: "Poppins", sans-serif;
  font-size: 2em;
  color: white;
  cursor: pointer;
  &:hover ${NeonTitle} {
    margin-right: 10px;
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
