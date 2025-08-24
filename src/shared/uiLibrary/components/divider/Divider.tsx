import "@/shared/uiLibrary/assets/scss/atoms/divider.scss";
import { getResponsiveClasses } from "@/shared/uiLibrary/utils/dynamicClass";
import type { BorderStyleProps, DividerVariantProps, ResponsiveBorderStyleProps, ResponsiveDividerVariantProps } from "@/shared/uiLibrary/utils/types";
import classNames from "classnames";
import { forwardRef } from "react";

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: ResponsiveDividerVariantProps | DividerVariantProps;
  borderStyle?: ResponsiveBorderStyleProps | BorderStyleProps
}
const Divider = forwardRef<HTMLDivElement, DividerProps>((props, ref) => {
  const { variant = "default", borderStyle = "solid", ...rest } = props;
  const dividerClasses = classNames("divider", getResponsiveClasses("divider", variant), getResponsiveClasses('border-style', borderStyle));
  return <div className={dividerClasses} ref={ref} {...rest}></div>;
});
Divider.displayName = "Divider";
export default Divider;
