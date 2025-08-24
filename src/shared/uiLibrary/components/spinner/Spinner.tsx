import "@/shared/uiLibrary/assets/scss/atoms/spinner.scss";
import { getResponsiveClasses } from "@/shared/uiLibrary/utils/dynamicClass";
import { forwardRef } from "react";
/*************************
 * Type definition
 *************************/
type Sizes = "xsm" | "sm" | "md" | "lg" | "xlg";
/*************************
 * Component Props
 *************************/
export interface SpinnerProps extends React.ComponentProps<"span"> {
  size?: { xsm: Sizes; sm?: Sizes; md?: Sizes; lg?: Sizes; xlg: Sizes } | Sizes;
  variant?: "default" | "white";
  spinnerColor?: string;
}
/*************************
 * Main Spinner Component
 *************************/
const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>((props, ref) => {
  const { size = "xsm", variant, spinnerColor } = props;
  /*************************
   * Define dynamic classes
   *************************/
  const spinnerVariant = variant ? `spinner--variant-${variant}` : "spinner--variant-default";

  const spinnerSizeClass = getResponsiveClasses("spinner", size);
  const spinnerClasses = ["spinner", spinnerVariant, spinnerSizeClass].filter(Boolean).join(" ");
  return <span ref={ref} {...props} className={spinnerClasses} style={{ borderColor: spinnerColor || "" }}></span>;
});
Spinner.displayName = "Spinner";
export default Spinner;
