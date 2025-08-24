import "@/shared/uiLibrary/assets/scss/atoms/box.scss";
import {
  generateMarginPaddingRadius,
  generateOverflowClasses,
  generateRadiusClasses,
  getResponsiveClasses,
} from "@/shared/uiLibrary/utils/dynamicClass";
import type {
  AllowedElementsProps,
  AxisOverflowProps,
  BorderStyleProps,
  BorderWidthProps,
  ColorProps,
  OrderProps,
  OverflowProps,
  PositionDirectionProps,
  PositionProps,
  RadiusProps,
  ResponsiveBackgroundProps,
  ResponsiveBorderStyleProps,
  ResponsiveBorderWidthProps,
  ResponsiveColorProps,
  ResponsiveOrderProps,
  ResponsivePositionDirectionProps,
  ResponsivePositionProps,
  ResponsiveRadiusSideProps,
  ResponsiveShadowProps,
  ResponsiveSideProps,
  ShadowProps,
} from "@/shared/uiLibrary/utils/types";
import classNames from "classnames";
import { createElement, forwardRef } from "react";

/*************************
 * Allowed HTML elements
 *************************/

/*************************
 * Component Props
 *************************/
export interface BoxProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  as?: AllowedElementsProps;
  position?: ResponsivePositionProps | PositionProps;
  zIndex?: string;
  left?: ResponsivePositionDirectionProps | PositionDirectionProps;
  right?: ResponsivePositionDirectionProps | PositionDirectionProps;
  top?: ResponsivePositionDirectionProps | PositionDirectionProps;
  bottom?: ResponsivePositionDirectionProps | PositionDirectionProps;
  shadow?: ResponsiveShadowProps | ShadowProps;
  background?: ResponsiveBackgroundProps | ColorProps;
  /* flex */
  order?: ResponsiveOrderProps | OrderProps;
  /* padding */
  padding?: ResponsiveSideProps;
  /* border */
  border?: boolean;
  borderColor?: ResponsiveColorProps | ColorProps;
  borderWidth?: ResponsiveBorderWidthProps | BorderWidthProps;
  borderStyle?: ResponsiveBorderStyleProps | BorderStyleProps;
  radius?: RadiusProps | ResponsiveRadiusSideProps;
  /* overflow */

  overflow?: AxisOverflowProps | OverflowProps;
}

/*************************
 * Component
 *************************/
const Box = forwardRef<HTMLElement, BoxProps>((props, ref) => {
  const {
    /* padding */
    padding,
    /* position */
    position,
    left,
    right,
    top,
    bottom,
    zIndex,
    /* border */
    border,
    borderColor,
    borderWidth = "1",
    borderStyle = "solid",
    radius = 0,
    /* overflow */
    overflow,
    /* flex */
    order = false,
    /* common */
    as = "div",
    children,
    background = "transparent",
    shadow,
    className,
    ...rest
  } = props;

  const classes = classNames(
    "box",
    {
      border: border,
    },
    generateMarginPaddingRadius(padding, "p"),
    getResponsiveClasses("position", position),
    getResponsiveClasses("left", left),
    getResponsiveClasses("right", right),
    getResponsiveClasses("top", top),
    getResponsiveClasses("bottom", bottom),

    border && getResponsiveClasses("border", borderColor),
    border && getResponsiveClasses("border-width", borderWidth),
    border && getResponsiveClasses("border-style", borderStyle),

    generateRadiusClasses(radius),
    generateOverflowClasses(overflow),
    getResponsiveClasses("bg", background),
    getResponsiveClasses("shadow", shadow),
    getResponsiveClasses("flex-order", order),

    className
  );

  return createElement(
    as,
    {
      ref,
      className: classes,
      style: { ...props.style, zIndex: zIndex },
      ...rest,
    },
    children
  );
});

Box.displayName = "Box";
export default Box;
