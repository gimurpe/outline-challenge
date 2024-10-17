import { css } from "@emotion/react";

export default css({
  "&.dashboard-page": {
    width: "100%",
    height: "100vh",
    display: "grid",
    gridTemplateColumns: "1fr",
    gridTemplateRows: "auto 1fr",
    position: "relative",
    background: "#f0ebeb",
  },
  "&.dashboard-page__modal-content": {
    flexDirection: "column",
    justifyContent: "space-evenly",
    height: "300px",
    fontSize: "20px",
    color: "black",
  },
  ".dashboard-page": {
    "&__list-container": {
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      overflow: "hidden",
    },
    "&__loading-indicator": {
      flexDirection: "column",
      color: "black",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "16px",
    },
    "&__list": {
      border: "1px solid #e6e4dc",
      maxWidth: "100%",
      height: "90%",
      maxHeight: "800px",
      width: "100%",
      overflow: "auto",
      boxSizing: "border-box",
    },
    [`&__listItemEven, &__listItemOdd`]: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
    },
    "&__listItemEven": {
      backgroundColor: "#409341",
    },
    "&__listItemOdd": {
      backgroundColor: "white",
      color: "black",
    },
    "&__listItem-content": {
      alignItems: "center",
      justifyContent: "center",
    },
    "&__listItem-text": {
      // Leave some space for the eye
      width: "calc(100% - 100px)",
      // Mobile First Approach
      "@media (min-width: 768px)": {
        width: "100%",
      },
    },
    "&__listItem-eye": {
      position: "absolute",
      right: "15px",
      fontSize: "30px",
      "&:hover": {
        opacity: 0.8,
      },
    },
    "&__sign-out-btn": {
      margin: "10px",
      marginLeft: "auto",
    },

    button: {
      border: "1px solid gray",
    },
  },
});
