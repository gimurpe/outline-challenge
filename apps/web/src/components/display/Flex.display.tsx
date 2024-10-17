/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import React from "react";
import styled from "@emotion/styled";
import * as CSS from "csstype";
import { FlexboxProps, ResponsiveValue, variant } from "styled-system";

import Base, { BaseProps } from "./Base.display";

const FlexBase = styled(Base)(variant({ scale: "layouts" }));
export type StringOrArray<T> = T[] | T | string[];

type ExtendedFlexProps = {
  flexDirection: StringOrArray<CSS.Property.FlexDirection>;
} & Omit<FlexboxProps, "flexDirection">;
interface Props extends BaseProps, Partial<ExtendedFlexProps> {
  onClick?: React.EventHandler<React.SyntheticEvent>;
  className?: string;
  variant?: ResponsiveValue<string> | undefined;
  dataCy?: string;
}

const Flex: React.FC<Props> = React.forwardRef<HTMLDivElement, Props>(
  (props, ref) => (
    <FlexBase
      as="div"
      display="flex"
      data-display="Flex"
      {...props}
      ref={ref}
    />
  )
);

export default Flex;
