import "@/shared/uiLibrary/assets/scss/atoms/textarea.scss";
import { getResponsiveClasses } from "@/shared/uiLibrary/utils/dynamicClass";
import classNames from "classnames";
import { forwardRef } from "react";
import { Text } from "../text";
import type { TextareaProps } from "./Textarea.props";

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>((props, ref) => {
  const {
    size,
    label,
    labelHidden,
    labelAction,
    helpText,
    error,
    name,
    radius,
    className,
    disabled,
    readOnly,
    resize = false,
    ...rest
  } = props;

  const textareaClasses = classNames("textarea--field", className, getResponsiveClasses("textarea", size), {
    "textarea--field-error": error?.status,
    [`textarea--radius-${radius}`]: radius,
    [`textarea--disabled`]: disabled,
    [`textarea--readonly`]: readOnly,
    "textarea--resize": !resize,
  });
  return (
    <div className="textarea">
      {/************************* *
       *  Label and Label action text
       * *************************/}
      {(label || labelAction) && (
        <div className="textarea--label">
          {label && !labelHidden && (
            <label className="textarea--label-text" htmlFor={name}>
              <Text size="md" weight="regular" color="primary">
                {label}
              </Text>
            </label>
          )}
          {labelAction && <div className="textarea--label-action">{labelAction}</div>}
        </div>
      )}
      {/************************* *
       *  Text area field
       * *************************/}
      <div className="textarea--field-wrapper">
        <textarea
          name={name}
          id={name}
          ref={ref}
          disabled={disabled}
          readOnly={readOnly}
          {...rest}
          className={textareaClasses}
        ></textarea>
        {/************************* *
         *  Help text
         * *************************/}
        {helpText && (
          <div className="textarea--help-text">
            <Text size="sm" weight="regular" color="tertiary">
              {helpText || ""}
            </Text>
          </div>
        )}
        {/************************* *
         *  Error
         * *************************/}
        {!!error?.status && (
          <div className="textarea--error-message">
            <Text size="sm" weight="regular" color="danger">
              {error?.message || ""}
            </Text>
          </div>
        )}
      </div>
    </div>
  );
});
Textarea.displayName = "Textarea";
export default Textarea;
