import classNames from "classnames";
import { forwardRef, type InputHTMLAttributes, useId, useImperativeHandle, useRef } from "react";

import "@/shared/uiLibrary/assets/scss/atoms/radio.scss";
import type { ColorProps } from "@/shared/uiLibrary/utils/types";
import _ from "lodash";
import { Text } from "../text";

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode | string;
  labelPosition?: "top" | "center";
  name?: string;
  variant?: ColorProps;
  id?: string;
}

const Radio = forwardRef<HTMLInputElement, Props>(
  ({ label, labelPosition, variant, name, disabled = false, id, checked, onChange, value, ...rest }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const autoId = useId();
    const inputId = id || autoId;

    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    return (
      <div
        className={classNames("radio", {
          "radio--disabled": disabled,
        })}
        aria-disabled={disabled}
        role="radio"
        aria-checked={checked}
      >
        <label
          htmlFor={inputId}
          className={classNames("radio--field-wrapper", {
            [`radio--label-position--${labelPosition}`]: !!labelPosition,
          })}
        >
          <div>
            <input
              id={inputId}
              ref={inputRef}
              className={classNames("radio--field", {
                [`radio--field-${variant}`]: !!variant,
              })}
              type="radio"
              name={name}
              value={value}
              disabled={disabled}
              checked={checked}
              onChange={onChange}
              {...rest}
            />
          </div>
          {/**************************
           * Label
           **************************/}
          {label && (
            <div className="radio--label">
              {_.isString(label) ? (
                <Text size="md" weight="regular" color="primary">
                  {label}
                </Text>
              ) : (
                label
              )}
            </div>
          )}
        </label>
      </div>
    );
  }
);

Radio.displayName = "Radio";
export default Radio;
