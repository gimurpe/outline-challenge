import { css } from "@emotion/react";

export default css({
  position: "fixed",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  background: "rgba(0, 0, 0, 0.6)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
  ".modal": {
    "&__content": {
      background: "white",
      padding: "20px",
      borderRadius: "8px",
      maxWidth: "500px",
      width: "100%",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
      position: "relative",
    },
    "&__close": {
      position: "absolute",
      top: "10px",
      right: "10px",
      background: "none",
      border: "none",
      fontSize: "1.5rem",
      cursor: "pointer",
      color: "black",
    },
  },
});
