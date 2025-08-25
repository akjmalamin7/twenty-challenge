import "@/shared/uiLibrary/assets/scss/atoms/card.scss";
import {
  generateMarginPaddingRadius,
  generateRadiusClasses,
  generateShadowClasses,
  getResponsiveClasses,
} from "@/shared/uiLibrary/utils/dynamicClass";
import type {
  ColorProps,
  ResponsiveBackgroundColorProps,
  ResponsiveRadiusProps,
  ResponsiveShadowProps,
  ResponsiveSideProps,
  ShadowProps,
} from "@/shared/uiLibrary/utils/types";
import classNames from "classnames";
import { forwardRef } from "react";

export interface CardProps extends React.ComponentProps<"div"> {
  children?: React.ReactNode;
  background?: ResponsiveBackgroundColorProps | ColorProps;
  padding?: ResponsiveSideProps;
  shadow?: ResponsiveShadowProps | ShadowProps;
  radius?: ResponsiveRadiusProps;
}

const Card = forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  const { children, background, padding, shadow = "sm", radius = 16, className, ...rest } = props;

  const classes = classNames(
    "card",
    className,
    generateShadowClasses(shadow),
    generateRadiusClasses(radius),
    getResponsiveClasses("bg", background),
    generateMarginPaddingRadius(padding, "p")
  );

  return (
    <div ref={ref} className={classes} {...rest}>
      {children}
    </div>
  );
});

Card.displayName = "Card";
export default Card;
