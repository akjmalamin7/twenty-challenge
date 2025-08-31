import "@/shared/uiLibrary/assets/scss/atoms/inlineStack.scss";
import {
  generateMarginPaddingRadius,
  generateOverflowClasses,
  generateRadiusClasses,
  generateShadowClasses,
  getResponsiveClasses,
} from "@/shared/uiLibrary/utils/dynamicClass";
import type {
  AllowedElementsProps,
  AxisOverflowProps,
  BorderStyleProps,
  BorderWidthProps,
  ColorProps,
  FlexDirectionProps,
  FlexWrapProps,
  OrderProps,
  PositionDirectionProps,
  PositionProps,
  RadiusProps,
  ResponsiveAlignContentProps,
  ResponsiveAlignItemsProps,
  ResponsiveBackgroundColorProps,
  ResponsiveBorderStyleProps,
  ResponsiveBorderWidthProps,
  ResponsiveColorProps,
  ResponsiveFlexDirectionProps,
  ResponsiveFlexWrapProps,
  ResponsiveGapProps,
  ResponsiveGapXProps,
  ResponsiveGapYProps,
  ResponsiveJustifyContentProps,
  ResponsiveJustifyItemsProps,
  ResponsiveJustifySelfProps,
  ResponsiveOrderProps,
  ResponsivePositionDirectionProps,
  ResponsivePositionProps,
  ResponsiveRadiusSideProps,
  ResponsiveShadowProps,
  ResponsiveSideProps,
  ShadowProps,
  SpaceProps,
} from "@/shared/uiLibrary/utils/types";
import classNames from "classnames";
import { createElement, forwardRef } from "react";

/*************************
 * Component Props
 *************************/
export interface FormProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  as?: AllowedElementsProps;
  background?: ResponsiveBackgroundColorProps | ColorProps;
  shadow?: ResponsiveShadowProps | ShadowProps;
  /* flex */
  flexWrap?: ResponsiveFlexWrapProps | FlexWrapProps;
  flexDirection?: ResponsiveFlexDirectionProps | FlexDirectionProps;
  gap?: ResponsiveGapProps | SpaceProps;
  gapX?: ResponsiveGapXProps | SpaceProps;
  gapY?: ResponsiveGapYProps | SpaceProps;

  justifyContent?: ResponsiveJustifyContentProps;
  alignItems?: ResponsiveAlignItemsProps;
  justifyItems?: ResponsiveJustifyItemsProps;
  justifySelf?: ResponsiveJustifySelfProps;
  alignContent?: ResponsiveAlignContentProps;

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
  overflow?: AxisOverflowProps;
  /* position */
  position?: ResponsivePositionProps | PositionProps;
  zIndex?: string;
  left?: ResponsivePositionDirectionProps | PositionDirectionProps;
  right?: ResponsivePositionDirectionProps | PositionDirectionProps;
  top?: ResponsivePositionDirectionProps | PositionDirectionProps;
  bottom?: ResponsivePositionDirectionProps | PositionDirectionProps;
}

const Form = forwardRef<HTMLElement, FormProps>((props, ref) => {
  const {
    padding,
    border,
    borderColor,
    radius,
    borderStyle = "solid",
    borderWidth,
    overflow,
    position,
    zIndex,
    left,
    right,
    top,
    bottom,
    gap,
    gapX,
    gapY,
    justifyContent = "start",
    alignItems = "start",
    justifyItems,
    justifySelf,
    alignContent,
    order,
    flexDirection = "col",
    flexWrap,

    children,
    as = "form",
    background,
    shadow = "none",
    style,
    className,
    ...rest
  } = props;

  const generateClasses = classNames(
    "inline--stack",
    {
      border: border,
    },
    className,
    generateMarginPaddingRadius(padding, "p"),

    generateRadiusClasses(radius),

    generateOverflowClasses(overflow),
    generateShadowClasses(shadow),
    getResponsiveClasses("justify-content", justifyContent),
    getResponsiveClasses("justify-items", justifyItems),
    getResponsiveClasses("justify-self", justifySelf),
    getResponsiveClasses("align-items", alignItems),
    getResponsiveClasses("align-content", alignContent),
    getResponsiveClasses("gap", gap),
    getResponsiveClasses("gap-x", gapX),
    getResponsiveClasses("gap-y", gapY),
    getResponsiveClasses("flex-order", order),
    getResponsiveClasses("bg", background),

    border && getResponsiveClasses("border", borderColor),
    border && getResponsiveClasses("border-width", borderWidth),
    border && getResponsiveClasses("border-style", borderStyle),

    getResponsiveClasses("position", position),
    getResponsiveClasses("left", left),
    getResponsiveClasses("right", right),
    getResponsiveClasses("top", top),
    getResponsiveClasses("bottom", bottom),
    getResponsiveClasses("flex-direction", flexDirection),
    getResponsiveClasses("flex-wrap", flexWrap)
  );

  return createElement(
    as,
    {
      ref,
      className: generateClasses,
      style: { zIndex: zIndex, ...style },
      ...rest,
    },
    children
  );
});
Form.displayName = "Form";
export default Form;
