import "@/shared/uiLibrary/assets/scss/atoms/text.scss";
import { getResponsiveClasses } from "@/shared/uiLibrary/utils/dynamicClass";
import type {
  AllowedTextElementsProps,
  BreakWordProps,
  ColorProps,
  FontWeightProps,
  HoverProps,
  ResponsiveBreakWordProps,
  ResponsiveColorProps,
  ResponsiveFontWeightProps,
  ResponsiveHoverProps,
  ResponsiveTargetProps,
  ResponsiveTextAlignProps,
  ResponsiveTextDecorationProps,
  ResponsiveTruncateProps,
  TargetProps,
  TextAlignProps,
  TextDecorationProps,
  TruncateProps,
} from "@/shared/uiLibrary/utils/types";
import classNames from "classnames";
import { type ComponentPropsWithRef, type ElementType, forwardRef } from "react";

/*************************
 * Allowed HTML elements
 *************************/

type Sizes = "xs" | "sm" | "md" | "lg";
type Cursors = "pointer" | "zoom-out" | "zoom-in" | "auto" | "default" | "none" | "not-allowed";
/*************************
 * Component Props
 *************************/
export type BaseProps = {
  color?: ResponsiveColorProps | ColorProps;
  target?: ResponsiveTargetProps | TargetProps;
  size?: { xs: Sizes; sm?: Sizes; md?: Sizes; lg?: Sizes } | Sizes;
  alignment?: ResponsiveTextAlignProps | TextAlignProps;
  weight?: ResponsiveFontWeightProps | FontWeightProps;
  decoration?: ResponsiveTextDecorationProps | TextDecorationProps;
  as?: AllowedTextElementsProps;
  url?: string;
  breakWord?: ResponsiveBreakWordProps | BreakWordProps;
  truncate?: ResponsiveTruncateProps | TruncateProps;
  hover?: ResponsiveHoverProps | HoverProps;
  children?: React.ReactNode;
  cursor?: Cursors;
};

/*************************
 * Extend props based on element
 *************************/
export type TextProps<T extends AllowedTextElementsProps> = BaseProps &
  (T extends "a"
    ? React.AnchorHTMLAttributes<HTMLAnchorElement>
    : T extends "legend"
    ? React.HTMLAttributes<HTMLLegendElement>
    : React.HTMLAttributes<HTMLElement>) &
  Omit<ComponentPropsWithRef<T>, keyof BaseProps>;

const Text = forwardRef(
  <T extends AllowedTextElementsProps = "p">(props: TextProps<T> & { as?: T }, ref: React.Ref<HTMLElement>) => {
    const {
      color = "primary",
      target,
      size = "lg",
      alignment,
      weight = "regular",
      decoration,
      url,
      as,
      breakWord = "break-word",
      truncate,
      hover,
      className,
      children,
      cursor,
      ...rest
    } = props;
    const Component = (as || "p") as ElementType;
    const tag = as || "p";

    /*************************
     * Generate class list
     *************************/

    const textClasses = classNames(
      "text",
      className,
      getResponsiveClasses("text", color),
      getResponsiveClasses("decoration", decoration),
      getResponsiveClasses("truncate", truncate),
      getResponsiveClasses("font-weight", weight),
      getResponsiveClasses("text-align", alignment || "start"),
      getResponsiveClasses("text", tag),
      getResponsiveClasses("word-break", breakWord),
      getResponsiveClasses("text-hover", hover),
      getResponsiveClasses("cursor", cursor),
      getResponsiveClasses(`text-${tag}`, size)
    );

    /*************************
     * Return dynamic element
     * Set target & href only for <a>
     *************************/
    return (
      <Component
        ref={ref}
        {...rest}
        {...(target ? { target } : {})}
        {...(url ? { href: url } : {})}
        className={textClasses}
      >
        {children}
      </Component>
    );
  }
);

Text.displayName = "Text";

export default Text;
