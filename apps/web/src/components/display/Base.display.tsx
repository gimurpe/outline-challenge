/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import React, { HTMLAttributes, ReactNode } from "react";
import styled from "@emotion/styled";
import shouldForwardProp from "@styled-system/should-forward-prop";
import {
  background,
  BackgroundProps,
  border,
  borderRadius,
  BordersProps,
  buttonStyle,
  color,
  colorStyle,
  flexbox,
  grid,
  layout,
  LayoutProps,
  position,
  ResponsiveValue,
  shadow,
  space,
  SpaceProps,
  textStyle,
  typography,
  variant,
  width,
} from "styled-system";

type EmotionProps = LayoutProps &
  SpaceProps &
  BackgroundProps &
  BordersProps &
  HTMLAttributes<HTMLDivElement>;

export interface BaseProps extends Partial<EmotionProps> {
  children?: ReactNode;
  css?: any;
  variant?: ResponsiveValue<string> | undefined;
  as?: any;
  ref?: any;
  dataCy?: string;
}

const StyledBase = styled("div", { shouldForwardProp })(
  space,
  color,
  typography,
  layout,
  flexbox,
  grid,
  background,
  border,
  position,
  shadow,
  textStyle,
  colorStyle,
  buttonStyle,
  width,
  variant,
  borderRadius
);

const Base = React.forwardRef<any, BaseProps>((props, ref) => {
  return (
    <StyledBase
      {...props}
      ref={ref}
      {...(props?.dataCy ? { ["data-cy"]: props.dataCy } : {})}
    />
  );
});

export default Base;
