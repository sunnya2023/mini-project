import styled from "styled-components";
import Post from "../components/Post";
import Timeline from "../components/Timeline";

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr 5fr;
  /* overflow-y: scroll; */
  gap: 50px;
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
