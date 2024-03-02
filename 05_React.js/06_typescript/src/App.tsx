import styled from "styled-components";

const Wrapper = styled.div`
  display: fex;
  justfy-contents: center;
  align-items: center;
  background-color: ${(props) => props.theme.bgColor};
`;
const Title = styled.h1`
  color: ${(props) => props.theme.textColor};
`;
function App() {
  return (
    <Wrapper>
      <Title>hello</Title>
    </Wrapper>
  );
}

export default App;
