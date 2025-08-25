import { EyeIcon, SearchIcon } from '@/shared/uiLibrary/assets/icons';
import "@/shared/uiLibrary/assets/scss/atoms/input.scss";
import { getResponsiveClasses } from '@/shared/uiLibrary/utils/dynamicClass';
import { useMeasure } from '@uidotdev/usehooks';
import classNames from 'classnames';
import { isString } from 'lodash';
import React, { forwardRef, useState } from 'react';
import { Text } from '../text';
import type { InputProps } from './Input.props';

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [prefixRef, { width: prefixWidth }] = useMeasure();
  const [suffixRef, { width: suffixWidth }] = useMeasure();
  const [searchRef, { width: searchIconWidth }] = useMeasure();
  const {
    type,
    size = 'sm',
    name,
    label,
    helpText,
    labelHidden,
    isLoading,
    error,
    labelAction,
    prefix,
    prefixSeparator,
    suffix,
    suffixSeparator,
    radius,
    hideArrow,
    disabled,
    readOnly,
    className,
    style,
    ...rest
  } = props;

  /*************************
   * Apply breakpoints
   *************************/

  /*************************
   * Define dynamic classes
   *************************/
  const inputSizeClasses = getResponsiveClasses('input', size);
  const inputWrapperClass = classNames(
    'input--field-wrapper',
    className,
    inputSizeClasses,
    {
      'input--error': error?.status,
      [`radius-${radius}`]: radius,
    }
  );
  /*************************
   * Password hide/show
   *************************/
  const inputType =
    type === 'password' ? (visible ? 'text' : 'password') : type;
  const onVisible = () => setVisible((prev) => !prev);
  /*************************
   * Dynamic size
   *************************/
  const paddingLeft =
    type === 'search'
      ? `${searchIconWidth ? Math.ceil(searchIconWidth) : 12}px`
      : `${prefixWidth ? Math.ceil(prefixWidth + 2) : 12}px`;

  const paddingRight = suffixWidth ? `${Math.ceil(suffixWidth)}px` : '0px';

  /*************************
   * Check suffix/prefix
   *************************/
  const isValidPrefix =
    typeof prefix === 'string' || React.isValidElement(prefix);
  const isValidSuffix =
    typeof suffix === 'string' || React.isValidElement(suffix);
  return (
    <div className="input">
      {/************************* *
       *  Label and Label action text
       * *************************/}
      {(label || labelAction) && (
        <div className="input--label">
          {label && !labelHidden && (
            <label className="input--label-text" htmlFor={name}>
              <Text size="md" weight="regular" color="primary">
                {label}
              </Text>
            </label>
          )}
          {labelAction && (
            <div className="input--label-action">{labelAction}</div>
          )}
        </div>
      )}
      <div className={inputWrapperClass}>
        {/************************* *
         *  Input field
         * *************************/}
        <input
          type={inputType === 'search' && isLoading ? 'text' : inputType}
          ref={ref}
          {...rest}
          id={name}
          disabled={disabled}
          readOnly={readOnly}
          className={classNames('input--field', {
            'input--field-error': error?.status,
            'input--disabled': disabled,
            'input--readonly': readOnly,
            hide_arrow: hideArrow,
          })}
          style={{
            ...style,
            paddingLeft: paddingLeft,
            paddingRight: paddingRight,
          }}
          aria-invalid={!!error?.status}
        />
        {/************************* *
         *  Prefix
         * *************************/}
        {isValidPrefix && (
          <div
            className={classNames('input--prefix', {
              'input--prefix-separator': prefixSeparator,
            })}
            ref={prefixRef}
          >

            {isString(prefix) ? (
              <Text size="md" weight="regular" color="primary">
                {prefix}
              </Text>
            ) : (
              prefix
            )}
          </div>
        )}
        {/************************* *
         *  Suffix
         * *************************/}
        {isValidSuffix && (
          <div
            className={classNames('input--suffix', {
              'input--suffix-separator': suffixSeparator,
            })}
            ref={suffixRef}
          >
            {isString(suffix) ? (
              <Text
                size="md"
                weight="regular"
                color="primary"
                truncate={'truncate-1'}
              >
                {suffix}
              </Text>
            ) : (
              suffix
            )}
          </div>
        )}

        {/************************* *
         *  Help text
         * *************************/}
        {helpText && (
          <div className="input--help-text">
            <Text size="sm" weight="regular" color="tertiary">
              {helpText || ''}
            </Text>
          </div>
        )}
        {/************************* *
         *  password->show/hide
         * *************************/}
        {type === 'password' && (
          <button
            type="button"
            className="password-toggle"
            onClick={onVisible}
            aria-label={visible ? 'Hide password' : 'Show password'}
          >
            <EyeIcon visible={visible} />
          </button>
        )}

        {/************************* *
         *  Clear
         * *************************/}
        {/************************* *
         *  Search
         * *************************/}

        {type === 'search' && (
          <button
            type="button"
            className="input--search"
            ref={searchRef}
            aria-label="Search"
          >
            <SearchIcon />
          </button>
        )}
      </div>
      {/************************* *
       *  Error
       * *************************/}
      {!!error?.status && (
        <div className="input--error-message">
          <Text size="sm" weight="regular" color="danger">
            {error?.message || ''}
          </Text>
        </div>
      )}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
