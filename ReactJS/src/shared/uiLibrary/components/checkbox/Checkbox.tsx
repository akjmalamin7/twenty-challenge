import '@/shared/uiLibrary/assets/scss/atoms/checkbox.scss';
import { getResponsiveClasses } from '@/shared/uiLibrary/utils/dynamicClass';
import type { ColorProps } from '@/shared/uiLibrary/utils/types';
import classNames from 'classnames';
import React, { forwardRef, useImperativeHandle, useRef, type InputHTMLAttributes } from 'react';
import { Text } from '../text';
/*************************
 * Component Props
 *************************/
export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode | string;
  labelPosition?: 'top' | 'center';
  variant?: ColorProps;
}

/*************************
 * Main Component
 *************************/
const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, variant = 'blue', labelPosition = 'center', name, disabled, ...props }, ref) => {
    /*************************
     * Check valid label
     *************************/
    const isValidLabel = typeof label === 'string' || React.isValidElement(label);
    /*************************
     * Expose ref
     *************************/
    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);
    const handleLabelClick = () => {
      inputRef.current?.click();
    };
    /*************************
     * Generate Class
     *************************/
    const checkboxColorClasses = getResponsiveClasses("checkbox", variant)

    return (
      <div
        className={classNames('checkbox', {
          [`checkbox--label-position--${labelPosition}`]: !!labelPosition,
          'checkbox--disabled': disabled,
        })}
      >
        <label className="checkbox--field-wrapper">
          <input
            type="checkbox"
            ref={inputRef}
            className={classNames('checkbox--field', checkboxColorClasses
            )}
            id={name}
            {...props}
            disabled={disabled}
          />
          <div className="checkbox--checkmark-icon">
            <svg
              className="checkbox--checkmark-svg"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </label>
        {/*************************
         * * Label
         **************************/}
        {
          isValidLabel && (
            typeof label === 'string' ? (
              <label
                className="checkbox--label"
                htmlFor={name}
              >
                <Text
                  size="md"
                  weight="regular"
                  color="primary"
                >
                  {label}
                </Text>
              </label>
            ) : (
              <div
                className="label-container"
                onClick={handleLabelClick}
              >
                {label}
              </div>
            )
          )
        }
      </div>
    );
  },
);

Checkbox.displayName = 'Checkbox';
export default Checkbox;
