import "@/shared/uiLibrary/assets/scss/atoms/button.scss";
import { getResponsiveClasses } from "@/shared/uiLibrary/utils/dynamicClass";
import type { FontWeightProps, ResponsiveFontWeightProps } from "@/shared/uiLibrary/utils/types";
import classNames from "classnames";
import { forwardRef, Fragment } from "react";
import { Spinner } from "../spinner";

/*************************
 * Type definition
 *************************/
export type Sizes = "xs" | "sm" | "md" | "lg";
type Color = "primary" | "secondary" | "success" | "info" | "warning" | "danger" | "white" | "blue";
type Variant = "solid" | "outline" | "fill" | "plain" | "link";

/*************************
 * Component Props
 *************************/
export interface ButtonProps extends React.ComponentProps<"button"> {
  color?: Color;
  variant?: Variant;
  size?: { xs?: Sizes; sm?: Sizes; md?: Sizes; lg?: Sizes } | Sizes;
  loading?: boolean;
  block?: boolean;
  icon?: React.ReactNode;
  href?: string;
  target?: React.HTMLAttributeAnchorTarget;
  spinnerColor?: string;
  children?: React.ReactNode;
  weight?: ResponsiveFontWeightProps | FontWeightProps;
}

/*************************
 * Main Button Component
 *************************/
const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    variant = "fill",
    color = "primary",
    size = "sm",
    block = false,
    loading = false,
    spinnerColor,
    className,
    disabled,
    href,
    target,
    children,
    type = "button",
    weight = "medium",
    ...rest
  } = props;

  /*************************
   * Define dynamic classes
   *************************/
  const btnClasses = [
    "btn",
    className,
    getResponsiveClasses("btn", variant),
    getResponsiveClasses("btn", color),
    getResponsiveClasses("btn", size),
    getResponsiveClasses("font-weight", weight),
    loading ? `loading` : "",
    loading && variant !== "link" && variant !== "plain" ? `loading--bg` : "",
    disabled ? `btn--disabled` : "",
    block ? `btn--block` : "",
  ]
    .filter(Boolean)
    .join(" ");

  /*************************
   * loading element
   *************************/
  const innerElement = (
    <Fragment>
      {loading && (
        <span className={classNames({ "btn--loading": loading })}>
          {variant === "plain" || variant === "link" ? (
            <Spinner size={"xsm"} variant="default" spinnerColor={spinnerColor} />
          ) : (
            <Spinner size={"xsm"} variant="white" spinnerColor={spinnerColor} />
          )}
        </span>
      )}
      {props.icon} {children}
    </Fragment>
  );

  /*************************
   * Link button
   *************************/
  if (href && variant === "link")
    return (
      <a
        href={href}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
        className={btnClasses}
      >
        {innerElement}
      </a>
    );

  /*************************
   * Button
   *************************/
  return (
    <button ref={ref} {...rest} className={btnClasses} aria-busy={loading} type={type} disabled={disabled}>
      {innerElement}
    </button>
  );
});

Button.displayName = "Button";

export default Button;
