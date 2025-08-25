import React, { type FocusEvent } from "react";

export type ErrorType = {
  status: boolean;
  message: string;
};
export type Sizes = "xs" | "sm" | "md" | "lg";
export interface OTPProps extends Omit<React.ComponentProps<'input'>, "size"> {
  size?: { xs?: Sizes; sm?: Sizes; md?: Sizes; lg?: Sizes } | Sizes;
  label?: string;
  helpText?: string;
  error?: ErrorType;
  onOtpValue?: (value: string) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
}