import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, rgb(238, 0, 153), rgb(221, 0, 238));
`;

const Box = styled(motion.div)`
  height: 400px;
  width: 400px;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Circle2 = styled(motion.div)`
  background-color: #fff;
  height: 100px;
  width: 100px;
  border-radius: 50px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 50vw;
  gap: 10px;
  /* background-color: rgba(255, 255, 255, 0.4); */
`;
const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Btn = styled.button`
  border: none;
  outline: none;
  color: blue;
  font-size: 2rem;
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;
  cursor: pointer;
`;

//   hover: { scale: 1.5, rotateZ: 90 },
//   click: { scale: 1, borderRadius: "100px" },
//   drag: { backgroundColor: "rgb(0, 151, 230)", transition: { duration: 10 } },
// };
function App() {
  const [clicked, setClicked] = useState(false);
  const [buttonColor, setButtonColor] = useState("blue");
  const toggleClicked = () => {
    setClicked((prev) => !prev);
    const newColor = clicked ? "red" : "blue";
    setButtonColor(newColor);
  };

  const [id, setId] = useState<null | string>(null);
  const hoverVar = {
    start: {
      scale: 1.1,
      x: -20,
      y: -20,
    },
    end: {
      scale: 1,
    },
  };
  return (
    <Wrapper>
      <AnimatePresence>
        <Grid>
          <Box
            layoutId="1"
            onClick={() => setId("1")}
            variants={hoverVar}
            whileHover="start"
          ></Box>
          <Box>{!clicked ? <Circle2 layoutId="on" /> : null}</Box>
          <Box>{clicked ? <Circle2 layoutId="on" /> : null}</Box>
          <Box
            layoutId="4"
            onClick={() => setId("4")}
            whileHover={{ scale: 1.1, x: 20, y: 20 }}
          ></Box>
        </Grid>

        {id === "1" || id === "4" ? (
          <Overlay
            onClick={() => setId(null)}
            initial={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
            animate={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            exit={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
          >
            <Box
              layoutId={id}
              style={{
                width: 400,
                height: 400,
                backgroundColor: " rgba(255, 255, 255,1)",
              }}
            />
          </Overlay>
        ) : null}
      </AnimatePresence>
      <Btn onClick={toggleClicked} style={{ color: buttonColor }}>
        Switch
      </Btn>
    </Wrapper>
  );
}

export default App;

// import styled from "styled-components";
// import {
//   AnimatePresence,
//   delay,
//   motion,
//   useMotionValue,
//   useMotionValueEvent,
//   useScroll,
//   useTransform,
// } from "framer-motion";
// import { useEffect, useRef, useState } from "react";
// import { click } from "@testing-library/user-event/dist/click";

// const Wrapper = styled(motion.div)`
//   height: 100vh;
//   width: 100vw;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   background: linear-gradient(135deg, rgb(238, 0, 153), rgb(221, 0, 238));
// `;

// const Box = styled(motion.div)`
//   /* width: 400px; */
//   height: 400px;
//   /* display: grid; */
//   /* grid-template-columns: repeat(2, 1fr); */
//   /* position: absolute;
//   top: 100px; */
//   background-color: rgba(255, 255, 255, 0.3);
//   border-radius: 10px;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   font-size: 28px;
//   box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
// `;
// // const Circle = styled(motion.div)`
// //   background-color: #fff;
// //   height: 70px;
// //   width: 70px;
// //   place-self: center;
// //   border-radius: 35px;
// //   box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
// // `;

// const Circle2 = styled(motion.div)`
//   background-color: #fff;
//   height: 100px;
//   width: 100px;
//   border-radius: 50px;
//   box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
// `;
// const BiggerBox = styled(motion.div)`
//   width: 600px;
//   height: 600px;
//   background-color: rgba(255, 255, 255, 0.4);
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   /* overflow: hidden; */
// `;
// // const Svg = styled.svg`
// //   width: 300px;
// //   height: 300px;
// //   path {
// //     stroke: white;
// //     stroke-width: 2;
// //   }
// // `;

// const Grid = styled(motion.div)`
//   display: grid;
//   grid-template-columns: repeat(2, 1fr);
//   width: 50vw;
//   gap: 10px;
//   /* background-color: rgba(255, 255, 255, 0.4); */
// `;
// const Overlay = styled(motion.div)`
//   width: 100%;
//   height: 100%;
//   position: absolute;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;
// const Btn = styled.button`
//   border: none;
//   outline: none;
//   color: blue;
//   font-size: 2rem;
//   border-radius: 10px;
//   padding: 20px;
//   margin-top: 20px;
//   cursor: pointer;
// `;

// //variants
// // const boxVariants = {
// //   start: {
// //     opacity: 0,
// //     scale: 0.5,
// //   },
// //   end: {
// //     opacity: 1,
// //     scale: 1,
// //     transition: {
// //       type: "spring",
// //       duration: 0.5,
// //       bounce: 0.5,
// //       staggerChildren: 0.5,
// //     },
// //   },
// // };

// // const circleVariants = {
// //   start: {
// //     opacity: 0,
// //   },
// //   end: {
// //     opacity: 1,
// //   },
// // };

// // const boxGesture = {
// //   hover: { scale: 1.5, rotateZ: 90 },
// //   click: { scale: 1, borderRadius: "100px" },
// //   drag: { backgroundColor: "rgb(0, 151, 230)", transition: { duration: 10 } },
// // };
// function App() {
//   // const biggerBoxRef = useRef(null);

//   // const x = useMotionValue(0);
//   //크기 변경
//   // const potato = useTransform(x, [-800, 0, 800], [2, 1, 0.1]);
//   // useMotionValueEvent(potato, "change", (latest) => {
//   //   console.log("x changed to", latest);
//   // });

//   //회전
//   // const rotate = useTransform(x, [-800, 800], [-360, 360]);
//   //배경색 변경
//   // const gradient = useTransform(
//   //   x,
//   //   [-800, 0, 800],
//   //   [
//   //     "linear-gradient(135deg, rgb(0, 210,238), rgb(0 ,83, 238))",
//   //     " linear-gradient(135deg, rgb(238, 0, 153), rgb(221, 0, 238))",
//   //     " linear-gradient(135deg, rgb(39, 252, 156), rgb(191, 242, 25))",
//   //   ]
//   // );

//   //스크롤 효과
//   // const { scrollYProgress } = useScroll();
//   // useMotionValueEvent(scrollY, "change", (latest) => {
//   //   console.log("scrollY", latest);
//   // });
//   // const scroll = useTransform(scrollYProgress, [0, 1], [1, 0]);

//   // useMotionValueEvent(scrollYProgress, "change", (latest) => {
//   //   console.log("scrollYProgress", latest);
//   // });
//   //SVG효과
//   // const svg = {
//   //   start: {
//   //     pathLength: 0,
//   //     fill: "rgba(255,255,255,0)",
//   //   },
//   //   end: {
//   //     fill: "rgba(255,255,255,1)",
//   //     pathLength: 1,
//   //   },
//   // };

//   //사라지는 효과
//   // const disapear = {
//   //   initial: {
//   //     opacity: 0,
//   //     scale: 0,
//   //   },
//   //   visible: {
//   //     opacity: 1,
//   //     scale: 1,
//   //     rotateZ: 360,
//   //   },
//   //   leaving: {
//   //     opacity: 0,
//   //     scale: 0,
//   //     y: 50,
//   //   },
//   // };
//   // const [showing, setShowing] = useState(false);
//   // const toggleShowing = () => setShowing(!showing);

//   //slide
//   // const slideBox = {
//   //   entry: (back: boolean) => ({
//   //     x: back ? -500 : 500,
//   //     opacity: 0,
//   //     scale: 0,
//   //   }),
//   //   center: {
//   //     x: 0,
//   //     opacity: 1,
//   //     scale: 1,
//   //     transition: {
//   //       duration: 1,
//   //     },
//   //   },
//   //   exit: (back: boolean) => ({
//   //     x: back ? 500 : -500,
//   //     opacity: 0,
//   //     scale: 0,
//   //     rotateX: 180,
//   //     transition: {
//   //       duration: 1,
//   //     },
//   //   }),
//   // };
//   // const [visible, setVisible] = useState(1);
//   // const [back, setBack] = useState(false);
//   // const nextPlease = () => {
//   //   setBack(false);
//   //   setVisible((prev) => (prev === 10 ? 10 : prev + 1));
//   // };

//   // const prevPlease = () => {
//   //   setBack(true);
//   //   setVisible((prev) => (prev === 1 ? 1 : prev - 1));
//   // };

//   //layout 효과
//   const [clicked, setClicked] = useState(false);
//   const [buttonColor, setButtonColor] = useState("blue");
//   const toggleClicked = () => {
//     setClicked((prev) => !prev);
//     const newColor = "red";
//     setButtonColor(newColor);
//   };

//   const [id, setId] = useState<null | string>(null);
//   const hoverVar = {
//     start: {
//       scale: 1.1,
//       x: -20,
//       y: -20,
//     },
//     end: {
//       scale: 1,
//     },
//   };
//   return (
//     <Wrapper>
//       {/* <Grid>
//         {["1", "2", "3", "4"].map((n) => (
//           <Box onClick={() => setId(n)} key={n} layoutId={n}>
//             {id === "2" ? <Circle2 /> : null}
//           </Box>
//         ))}
//       </Grid>
//       <AnimatePresence>
//         {id === "1" || id === "4" ? (
//           <Overlay
//             onClick={() => setId(null)}
//             initial={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
//             animate={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
//             exit={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
//           >
//             <Box
//               layoutId={id}
//               style={{
//                 width: 400,
//                 height: 400,
//                 backgroundColor: " rgba(255, 255, 255,1)",
//               }}
//             />
//           </Overlay>
//         ) : null}
//       </AnimatePresence> */}
//       <AnimatePresence>
//         <Grid>
//           <Box
//             layoutId="1"
//             onClick={() => setId("1")}
//             variants={hoverVar}
//             whileHover="start"
//           ></Box>
//           <Box>{!clicked ? <Circle2 layoutId="on" /> : null}</Box>
//           <Box>{clicked ? <Circle2 layoutId="on" /> : null}</Box>
//           <Box
//             layoutId="4"
//             onClick={() => setId("4")}
//             whileHover={{ scale: 1.1, x: 20, y: 20 }}
//           ></Box>
//         </Grid>

//         {id === "1" || id === "4" ? (
//           <Overlay
//             onClick={() => setId(null)}
//             initial={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
//             animate={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
//             exit={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
//           >
//             <Box
//               layoutId={id}
//               style={{
//                 width: 400,
//                 height: 400,
//                 backgroundColor: " rgba(255, 255, 255,1)",
//               }}
//             />
//           </Overlay>
//         ) : null}
//       </AnimatePresence>
//       <Btn onClick={toggleClicked} style={{ color: buttonColor }}>
//         Switch
//       </Btn>
//     </Wrapper>
//   );
// }

// export default App;
