import { css } from "@emotion/react";

export default css({
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "auto",
  ".sign-in-form": {
    "&__content-wrapper": {
      position: "relative",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    "&__submit-btn": {
      backgroundColor: "#409341",
      border: "none",
      borderRadius: "5px",
      width: "100px",
      padding: "10px",
      cursor: "pointer",
      marginLeft: "auto",
      ":hover": {
        opacity: 0.8,
      },
    },
  },
});
