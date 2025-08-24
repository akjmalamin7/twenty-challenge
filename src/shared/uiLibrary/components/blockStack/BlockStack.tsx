import "@/shared/uiLibrary/assets/scss/atoms/blockStack.scss";
import {
  generateMarginPaddingRadius,
  generateOverflowClasses,
  generateRadiusClasses,
  generateShadowClasses,
  getResponsiveClasses,
} from "@/shared/uiLibrary/utils/dynamicClass";
import type {
  AlignContentProps,
  AlignItemsProps,
  AllowedElementsProps,
  AxisOverflowProps,
  BorderStyleProps,
  BorderWidthProps,
  ColorProps,
  JustifyContentProps,
  JustifyItemsProps,
  JustifySelfProps,
  OrderProps,
  OverflowProps,
  PositionDirectionProps,
  PositionProps,
  RadiusProps,
  ResponsiveAlignContentProps,
  ResponsiveAlignItemsProps,
  ResponsiveBackgroundProps,
  ResponsiveBorderStyleProps,
  ResponsiveBorderWidthProps,
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
import classNames from 'classnames';
import { createElement, forwardRef } from 'react';

/*************************
 * Component Props
 *************************/
export interface BlockStackProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  as?: AllowedElementsProps;
  background?: ResponsiveBackgroundProps | ColorProps;
  shadow?: ResponsiveShadowProps | ShadowProps;
  /* flex */
  gap?: ResponsiveGapProps | SpaceProps;
  gapX?: ResponsiveGapXProps | SpaceProps;
  gapY?: ResponsiveGapYProps | SpaceProps;

  justifyContent?: ResponsiveJustifyContentProps | JustifyContentProps;
  alignItems?: ResponsiveAlignItemsProps | AlignItemsProps;
  justifyItems?: ResponsiveJustifyItemsProps | JustifyItemsProps;
  justifySelf?: ResponsiveJustifySelfProps | JustifySelfProps;
  alignContent?: ResponsiveAlignContentProps | AlignContentProps;

  order?: ResponsiveOrderProps | OrderProps;
  /* padding */
  padding?: ResponsiveSideProps;
  /* border */
  border?: boolean;
  borderColor?: ResponsiveBackgroundProps | ColorProps;
  borderWidth?: ResponsiveBorderWidthProps | BorderWidthProps;
  borderStyle?: ResponsiveBorderStyleProps | BorderStyleProps;
  radius?: RadiusProps | ResponsiveRadiusSideProps;
  /* overflow */
  overflow?: AxisOverflowProps | OverflowProps;
  /* position */
  position?: ResponsivePositionProps | PositionProps;
  zIndex?: string;
  left?: ResponsivePositionDirectionProps | PositionDirectionProps;
  right?: ResponsivePositionDirectionProps | PositionDirectionProps;
  top?: ResponsivePositionDirectionProps | PositionDirectionProps;
  bottom?: ResponsivePositionDirectionProps | PositionDirectionProps;
}

const BlockStack = forwardRef<HTMLElement, BlockStackProps>((props, ref) => {
  const {
    padding,
    border,
    borderColor,
    radius,
    borderStyle = 'solid',
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
    justifyContent = 'start',
    alignItems = 'normal',
    justifyItems,
    justifySelf,
    alignContent,
    order,

    children,
    as = 'div',
    background,
    shadow = 'none',
    style,
    className,
    ...rest
  } = props;

  const classes = classNames(
    'block--stack',
    className,
    {
      border: border,
    },
    generateMarginPaddingRadius(padding, 'p'),
    generateShadowClasses(shadow),
    generateOverflowClasses(overflow),
    generateRadiusClasses(radius),
    getResponsiveClasses('justify-content', justifyContent),
    getResponsiveClasses('justify-items', justifyItems),
    getResponsiveClasses('justify-self', justifySelf),
    getResponsiveClasses('align-items', alignItems),
    getResponsiveClasses('align-content', alignContent),
    getResponsiveClasses('gap', gap),
    getResponsiveClasses('gap-x', gapX),
    getResponsiveClasses('gap-y', gapY),
    getResponsiveClasses('position', position),
    getResponsiveClasses('left', left),
    getResponsiveClasses('right', right),
    getResponsiveClasses('top', top),
    getResponsiveClasses('bottom', bottom),

    border && getResponsiveClasses('border', borderColor),
    border && getResponsiveClasses('border-width', borderWidth),
    border && getResponsiveClasses('border-style', borderStyle),

    getResponsiveClasses('flex-order', order),
    getResponsiveClasses('bg', background)
  );
  return createElement(
    as,
    {
      ref,
      className: classes,
      style: { zIndex: zIndex, ...style },
      ...rest,
    },
    children
  );
});
BlockStack.displayName = 'BlockStack';
export default BlockStack;
