import { css, keyframes } from "@emotion/react";

const stripes = keyframes({
  ["100%"]: {
    backgroundPosition: "250px 0, 250px 0, 100px 0",
  },
});

export default css({
  backgroundColor: "white",
  height: "100vh",
  alignItems: "center",
  justifyContent: "flex-start",
  flexDirection: "column",
  ".sign-in-page": {
    "&__title-content": {
      flexDirection: "column",
      alignItems: "center",
      margin: "30px 0 80px 0",
      background: `
        repeating-radial-gradient(circle at 100% 100%, 
        rgba(64, 147, 65, 1) 4%, 
        rgba(64, 147, 65, 1) 8%, 
        white 8%, 
        white 12%), 
        repeating-radial-gradient(circle at 0% 100%, 
        rgba(64, 147, 65, 1) 4%, 
        rgba(64, 147, 65, 1) 8%, 
        white 8%, 
        white 12%);
      `,
      backgroundSize: "250px 250px",
      backgroundPosition: "0 0",
      animation: `${stripes} 20s linear infinite`,
      backgroundClip: "text",
      color: "transparent",
    },
    "&__title-icon": {
      fontSize: "10vw",
    },
    "&__title": {
      fontSize: "10vw",
      margin: 0,
    },
  },
});
