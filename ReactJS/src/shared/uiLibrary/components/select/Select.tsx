import { SelectArrowIcon } from "@/shared/uiLibrary/assets/icons";
import "@/shared/uiLibrary/assets/scss/atoms/select.scss";
import { getResponsiveClasses } from "@/shared/uiLibrary/utils/dynamicClass";
import classNames from "classnames";
import { forwardRef, useEffect, useState } from "react";
import { Text } from "../text";
import type { SelectProps } from "./Select.props";

/*************************
 * Main Component
 *************************/
const Select = forwardRef<HTMLSelectElement, SelectProps>((props, ref) => {
  const {
    size = "sm",
    name,
    label,
    helpText,
    disabled,
    error,
    value,
    options,
    onSelect,
    onBlur,
    onFocus,
    className,
    ...rest
  } = props;

  const [selectedValue, setSelectedValue] = useState<string>(value || "");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
    if (typeof onSelect === "function") {
      onSelect(event.target.value);
    }
  };

  useEffect(() => {
    if (!value) {
      setSelectedValue("");
      return;
    }
    setSelectedValue(value);
  }, [value, options]);

  /*************************
   * Define dynamic classes
   *************************/

  const selectClasses = classNames("select--field-wrapper", getResponsiveClasses("select", size));
  return (
    <div className={classNames("select", className)}>
      {/************************* *
       *  Label and Label action text
       * *************************/}
      {label && (
        <div className="select--label">
          <label className="select--label-text" htmlFor={name}>
            <Text size="md" weight="regular" color="primary">
              {label}
            </Text>
          </label>
        </div>
      )}
      {/************************* *
       *  Select field
       * *************************/}
      <div className={selectClasses}>
        <select
          ref={ref}
          name={name}
          value={selectedValue}
          disabled={disabled}
          onChange={handleChange}
          onBlur={onBlur}
          onFocus={onFocus}
          className={classNames("select--field", {
            "select--field-error": error?.status,
            "select--disabled": disabled,
          })}
          {...rest}
          id={name}
        >
          {options?.map((option, index) => (
            <option key={index} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>

        {/************************* *
         *  Arrow icon
         * *************************/}
        <div className="select--arrow-icon">
          <SelectArrowIcon />
        </div>
      </div>
      {/************************* *
       *  Help text
       * *************************/}
      {helpText && (
        <div className="select--help--text">
          <Text size="sm" weight="regular" color="tertiary">
            {helpText}
          </Text>
        </div>
      )}

      {/************************* *
       *  Error
       * *************************/}
      {error?.status && (
        <div className="select--error-message">
          <Text size="sm" weight="regular" color="danger">
            {error?.message}
          </Text>
        </div>
      )}
    </div>
  );
});

Select.displayName = "Select";
export default Select;
