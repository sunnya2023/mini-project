import styled from "styled-components";
import {
  delay,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";

const Wrapper = styled(motion.div)`
  height: 200vh;
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
const Svg = styled.svg`
  width: 300px;
  height: 300px;
  path {
    stroke: white;
    stroke-width: 2;
  }
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
  const { scrollYProgress } = useScroll();
  // useMotionValueEvent(scrollY, "change", (latest) => {
  //   console.log("scrollY", latest);
  // });
  const scroll = useTransform(scrollYProgress, [0, 1], [1, 0]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    console.log("scrollYProgress", latest);
  });
  const svg = {
    start: {
      pathLength: 0,
      fill: "rgba(255,255,255,0)",
    },
    end: {
      fill: "rgba(255,255,255,1)",
      pathLength: 1,
    },
  };
  return (
    <Wrapper style={{ background: gradient }}>
      {
        <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <motion.path
            variants={svg}
            initial="start"
            animate="end"
            transition={{
              default: { duration: 5 },
              fill: { duration: 2, delay: 3 },
            }}
            d="M224 373.1c-25.2-31.7-40.1-59.4-45-83.2-22.6-88 112.6-88 90.1 0-5.5 24.3-20.3 52-45 83.2zm138.2 73.2c-42.1 18.3-83.7-10.9-119.3-50.5 103.9-130.1 46.1-200-18.9-200-54.9 0-85.2 46.5-73.3 100.5 6.9 29.2 25.2 62.4 54.4 99.5-32.5 36.1-60.6 52.7-85.2 54.9-50 7.4-89.1-41.1-71.3-91.1 15.1-39.2 111.7-231.2 115.9-241.6 15.8-30.1 25.6-57.4 59.4-57.4 32.3 0 43.4 25.9 60.4 59.9 36 70.6 89.4 177.5 114.8 239.1 13.2 33.1-1.4 71.3-37 86.6zm47-136.1C280.3 35.9 273.1 32 224 32c-45.5 0-64.9 31.7-84.7 72.8C33.2 317.1 22.9 347.2 22 349.8-3.2 419.1 48.7 480 111.6 480c21.7 0 60.6-6.1 112.4-62.4 58.7 63.8 101.3 62.4 112.4 62.4 62.9 .1 114.9-60.9 89.6-130.2 0-3.9-16.8-38.9-16.8-39.6z"
          />
        </Svg>
      }
      <Box
        style={{ x, rotateZ: rotate, scale: scroll }}
        drag="x"
        dragSnapToOrigin
      />
    </Wrapper>
  );
}

export default App;
