/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import React from "react";

import Base, { BaseProps } from "./Base.display";

interface Props extends BaseProps {
  onClick?: React.EventHandler<React.SyntheticEvent>;
  type?: string;
  name?: string;
  className?: string;
  autofocus?: boolean;
  dataCy?: string;
}

const Box = React.forwardRef<any, Props>((props, ref) => (
  <Base data-display="Box" {...props} ref={ref} />
));

export default Box;
