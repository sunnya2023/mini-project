import React from "react";
import styled from "styled-components";

const Container = styled.div``;

interface CircleProps {
  bgColor: string;
}

const Circle = ({ bgColor }:CircleProps) => {
  return <Container>Circle</Container>;
};

export default Circle;
