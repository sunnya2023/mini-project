import styled from "styled-components";
import Post from "../components/Post";
import Timeline from "../components/timeline";

const Wrapper = styled.div`
  display: grid;
`;

function Home() {
  return (
    <Wrapper>
      <Post />
      <Timeline />
    </Wrapper>
  );
}

export default Home;
