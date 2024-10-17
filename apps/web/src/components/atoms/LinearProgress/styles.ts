import { css, keyframes } from "@emotion/react";

const slide1 = keyframes`
  0% {
    left: -200%;
    width: 30%;
  }
  50% {
    left: 30%;
    width: 30%;
  }
  100% {
    left: 100%;
    width: 30%;
  }
`;

const slide2 = keyframes`
  0% {
    left: -150%;
    width: 30%;
  }
  50% {
    left: 25%;
    width: 30%;
  }
  100% {
    left: 100%;
    width: 30%;
  }
`;

export default css({
  position: "relative",
  height: "4px",
  overflow: "hidden",
  backgroundColor: "#e0e0e0", // Background color for the progress track
  borderRadius: "2px",
  width: "100%",
  "&::before": {
    content: '""',
    position: "absolute",
    backgroundColor: "#3f51b5", // Color of the moving bar
    height: "100%",
    animation: `${slide1} 2s infinite ease-out`,
  },
  "&::after": {
    content: '""',
    position: "absolute",
    backgroundColor: "#3f51b5", // Color of the second moving bar
    height: "100%",
    animation: `${slide2} 2s infinite ease-out 1s`,
  },
});
