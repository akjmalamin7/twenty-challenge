import "@/shared/uiLibrary/assets/scss/atoms/soppiyaIcon.scss";
import { getResponsiveClasses } from "@/shared/uiLibrary/utils/dynamicClass";
import type { ResponsiveColorProps } from "@/shared/uiLibrary/utils/types";
import classNames from "classnames";
import React, { forwardRef } from "react";

type Sizes = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
export interface SoppiyaIconProps extends Omit<React.ComponentProps<"div">, "color"> {
  icon?: string;
  alt?: string;
  size?: { xs: Sizes; sm?: Sizes; md?: Sizes; lg?: Sizes } | Sizes;
  color?: ResponsiveColorProps;
  name?: string;
}
const SoppiyaIcon = forwardRef<HTMLDivElement, SoppiyaIconProps>((props, ref) => {
  const { icon, alt, className, size = "md", color = "secondary", name = "soppiya", ...rest } = props;
  return (
    <div
      ref={ref}
      {...rest}
      role="img"
      aria-label={alt || "icon"}
      className={classNames("icon", className, getResponsiveClasses("bg", color), getResponsiveClasses("icon", size))}
      style={{
        WebkitMaskImage: `url(https://static.soppiya.com/icons/${name}/${icon})`,
        maskImage: `url(https://static.soppiya.com/icons/${name}/${icon})`,
      }}
    />
  );
});
SoppiyaIcon.displayName = "SoppiyaIcon";
export default SoppiyaIcon;