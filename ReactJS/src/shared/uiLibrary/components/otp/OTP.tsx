import "@/shared/uiLibrary/assets/scss/atoms/otp.scss";
import { getResponsiveClasses } from "@/shared/uiLibrary/utils/dynamicClass";
import classNames from "classnames";
import { type ChangeEvent, forwardRef, useState } from "react";
import { Button } from "../button";
import { SoppiyaIcon } from "../soppiyaIcon";
import { Text } from "../text";
import type { OTPProps } from "./OTP.props";
const OTP = forwardRef<HTMLInputElement, OTPProps>((props, ref) => {
  const { size = "sm", label, helpText, error, disabled, readOnly, onOtpValue, onBlur, onFocus, ...rest } = props;
  const [otpCode, setOtpCode] = useState<string>("");
  const handleChangeOtpCode = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9-]/g, "");
    e.target.value = value;
    value = value.replaceAll("-", "");
    if (value.length > 6) return;
    setOtpCode(value);
    onOtpValue?.(value);
  }
  const handleOTPFormat = (str: string) => {
    return str.replaceAll("-", "").length > 3 ? str.slice(0, 3) + "-" + str.slice(3, 6) : str;
  }


  {/************************* *
  *  Classes
  * *************************/}
  const sizeClass = getResponsiveClasses('otp', size)
  const otpBoxClasses = classNames('otp--field-box', sizeClass)
  const phoneFieldClasses = classNames('otp--field', { 'otp--field-error': error?.status, 'otp--field-disabled': disabled, 'otp--filed-readonly': readOnly })
  return (
    <div className="otp">
      {/************************* *
       *  Label and Label action text
       * *************************/}
      {
        label && (
          <div className="otp--label">
            {label && (
              <label className="otp--label-text">
                <Text size="md" weight="regular" color="primary">
                  {label}
                </Text>
              </label>
            )}
          </div>
        )
      }

      {/************************* *
       *  field
       * *************************/}
      <div className="otp--field-box--wrapper">
        <div className={otpBoxClasses}>
          <input
            className={phoneFieldClasses}
            ref={ref}
            {...rest}
            type="text"
            placeholder="XXX-XXX"
            value={handleOTPFormat(otpCode)}
            onChange={handleChangeOtpCode}
            readOnly={readOnly}
            disabled={disabled}
            onBlur={onBlur}
            onFocus={onFocus}
          />
          <div className={classNames('otp--field-prefix', sizeClass)}>
            <Button variant="plain">
              <SoppiyaIcon icon="key-01.svg" size="sm" />
            </Button>
          </div>

        </div>
        {/************************* *
         *  Help text
         * *************************/}
        {helpText && (
          <div className="otp--help-message">
            <Text size="sm" weight="regular" color="tertiary">
              {helpText || ''}
            </Text>
          </div>
        )}
        {/************************* *
       *  Error
       * *************************/}
        {!!error?.status && (
          <div className="otp--error-message">
            <Text size="sm" weight="regular" color="danger">
              {error?.message || ''}
            </Text>
          </div>
        )}
      </div>
    </div>
  );
});
OTP.displayName = "OTP"
export default OTP;