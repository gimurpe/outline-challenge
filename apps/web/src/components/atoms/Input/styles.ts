import { css } from "@emotion/react";

export default css({
  ".input": {
    "&__field": {
      width: "70vw",
      padding: "10px",
      marginBottom: "10px",
      backgroundColor: "white",
      color: "black",
      borderRadius: "5px",
      "@media (min-width: 768px)": {
        width: "40vw",
      },
    },
    "&__field--error": {
      border: "1px solid red",
    },
    "&__error": {
      color: "red",
      textAlign: "left",
      fontSize: "12px",
      top: "-10px",
      position: "relative",
    },
  },
});
