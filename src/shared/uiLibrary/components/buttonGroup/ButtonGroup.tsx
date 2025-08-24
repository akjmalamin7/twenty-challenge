import "@/shared/uiLibrary/assets/scss/atoms/buttonGroup.scss";
import { getResponsiveClasses } from "@/shared/uiLibrary/utils/dynamicClass";
import type { JustifyContentProps, ResponsiveJustifyContentProps } from "@/shared/uiLibrary/utils/types";
import classNames from "classnames";
import { forwardRef } from "react";
/*************************
 * Component Props
 *************************/
export interface ButtonGroupProps extends React.ComponentProps<"div"> {
  alignment?: ResponsiveJustifyContentProps | JustifyContentProps;
  children?: React.ReactNode;
}
/*************************
 * Main Component
 *************************/
const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(({ alignment = "start", children, ...rest }, ref) => {
  const alignItemsClasses = classNames("buttons", getResponsiveClasses("buttons", alignment || "start"));
  return (
    <div className={alignItemsClasses} ref={ref} {...rest} role="group">
      {children}
    </div>
  );
});
ButtonGroup.displayName = "ButtonGroup";
export default ButtonGroup;
