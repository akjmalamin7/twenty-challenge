import { ExceptionIcon } from "@/shared/uiLibrary/assets/icons";
import "@/shared/uiLibrary/assets/scss/atoms/exceptionList.scss";
import classNames from "classnames";
import { forwardRef } from "react";
import { Text } from "../text";
/*************************
 * Types & Constants
 *************************/
export interface ExceptionListProps extends React.ComponentProps<"div"> {
  variant?: "success" | "warning" | "danger" | "info";
  icon?: React.ReactNode;
  description?: string;
  children?: React.ReactNode;
}

const defaultIcons: Record<"success" | "warning" | "danger" | "info", React.ReactNode> = {
  success: <ExceptionIcon variant="success" />,
  warning: <ExceptionIcon variant="warning" />,
  danger: <ExceptionIcon variant="danger" />,
  info: <ExceptionIcon variant="info" />,
};
/*************************
 * Main Component
 *************************/
const ExceptionList = forwardRef<HTMLDivElement, ExceptionListProps>((props, ref) => {
  const { variant = "success", className, icon, description, children, ...rest } = props;

  /*************************
   * Color
   *************************/
  const allowedTextColors = [
    "primary",
    "secondary",
    "tertiary",
    "success",
    "info",
    "warning",
    "danger",
    "white",
    "link",
  ] as const;
  type TextColor = (typeof allowedTextColors)[number];

  const color: TextColor = allowedTextColors.includes(variant) ? variant : "primary";

  const classes = classNames("exception", className, {
    [`exception--${variant}`]: true,
  });
  // If children is passed, render custom content
  if (children) {
    return (
      <div className={classes} ref={ref} {...rest}>
        {children}
      </div>
    );
  } else {
    return (
      <div className={classes} ref={ref} {...rest}>
        {/* Icon (either custom or default) */}
        {(icon || defaultIcons[variant]) && <span className="exception--icon">{icon ?? defaultIcons[variant]}</span>}

        {description && (
          <Text color={color} size="md" weight="regular" className="exception--icon">
            {description}
          </Text>
        )}
      </div>
    );
  }
});
ExceptionList.displayName = "ExceptionList";
export default ExceptionList;
