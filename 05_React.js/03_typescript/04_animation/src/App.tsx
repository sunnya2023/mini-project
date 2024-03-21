import styled from "styled-components";
import {
  delay,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
  useViewportScroll,
} from "framer-motion";
import { useEffect, useRef } from "react";

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, rgb(238, 0, 153), rgb(221, 0, 238));
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  /* display: grid; */
  /* grid-template-columns: repeat(2, 1fr); */
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;
const Circle = styled(motion.div)`
  background-color: #fff;
  height: 70px;
  width: 70px;
  place-self: center;
  border-radius: 35px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const BiggerBox = styled(motion.div)`
  width: 600px;
  height: 600px;
  background-color: rgba(255, 255, 255, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  /* overflow: hidden; */
`;

//variants
const boxVariants = {
  start: {
    opacity: 0,
    scale: 0.5,
  },
  end: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      duration: 0.5,
      bounce: 0.5,
      staggerChildren: 0.5,
    },
  },
};

const circleVariants = {
  start: {
    opacity: 0,
  },
  end: {
    opacity: 1,
  },
};

// const boxGesture = {
//   hover: { scale: 1.5, rotateZ: 90 },
//   click: { scale: 1, borderRadius: "100px" },
//   drag: { backgroundColor: "rgb(0, 151, 230)", transition: { duration: 10 } },
// };
function App() {
  // const biggerBoxRef = useRef(null);

  const x = useMotionValue(0);
  //크기 변경
  // const potato = useTransform(x, [-800, 0, 800], [2, 1, 0.1]);
  // useMotionValueEvent(potato, "change", (latest) => {
  //   console.log("x changed to", latest);
  // });

  //회전
  const rotate = useTransform(x, [-800, 800], [-360, 360]);
  //배경색 변경
  const gradient = useTransform(
    x,
    [-800, 0, 800],
    [
      "linear-gradient(135deg, rgb(0, 210,238), rgb(0 ,83, 238))",
      " linear-gradient(135deg, rgb(238, 0, 153), rgb(221, 0, 238))",
      " linear-gradient(135deg, rgb(39, 252, 156), rgb(191, 242, 25))",
    ]
  );

  //스크롤 효과
  const { scrollY, scrollYProgress } = useScroll();
  useMotionValueEvent("scrollY" as any, "change", (latest) => {
    console.log("scrollY", latest);
  });
  useMotionValueEvent("scrollYProgress" as any, "change", (latest) => {
    console.log("scrollYProgress", latest);
  });
  return (
    <Wrapper style={{ background: gradient }}>
      <Box style={{ x, rotateZ: rotate }} drag="x" dragSnapToOrigin />
    </Wrapper>
  );
}

export default App;
