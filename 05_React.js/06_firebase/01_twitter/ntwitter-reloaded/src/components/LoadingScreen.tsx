import styled from "styled-components";

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Text = styled.span`
  font-size: 20px;
`;
function LoadingScreen() {
  return (
    <Wrapper>
      <Text>LoadingScreen</Text>
    </Wrapper>
  );
}

export default LoadingScreen;
