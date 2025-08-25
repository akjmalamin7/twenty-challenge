import "@/shared/uiLibrary/assets/scss/atoms/switch.scss";
import type { ColorProps } from "@/shared/uiLibrary/utils/types";
import classNames from "classnames";
import { forwardRef, type InputHTMLAttributes } from "react";
import { Text } from "../text";

export interface SwitchProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelDirection?: "left" | "right";
  variant?: ColorProps;
}

const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ label, labelDirection = "right", variant = "primary", ...props }, ref) => {
    return (
      <div
        className={classNames("switch", {
          [`direction--${labelDirection}`]: !!labelDirection,
        })}
      >
        <input type="checkbox" ref={ref} {...props} />
        <label className={classNames("switch--style", `switch--${variant}`)}></label>
        {label && (
          <Text size={"md"} weight="regular" color="primary">
            {label}
          </Text>
        )}
      </div>
    );
  }
);
Switch.displayName = "Switch";
export default Switch;
