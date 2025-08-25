import { type FocusEvent } from "react";

export type ErrorType = {
  status: boolean;
  message: string;
};
export type PhoneType = {
  _id: string;
  dialing_code: string;
  format: string;
};
export type SelectCountryType = {
  _id: string;
  flag_icon: string;
  name: string;
  phone: PhoneType;
  country: string;
};
export type ValueType = {
  phone: string;
  country: string;
};
export type PhoneSchema = {
  _id: string;
  dialing_code: string;
  format: string;
};
export type CountrySchema = {
  _id: string;
  name: string;
  flag: string;
  phone: PhoneSchema;
};
export type Sizes = "xs" | "sm" | "md" | "lg";
export interface PhoneProps extends Omit<React.ComponentProps<"input">, "size" | "value" | "onChange"> {
  size?: { xs?: Sizes; sm?: Sizes; md?: Sizes; lg?: Sizes } | Sizes;
  label?: React.ReactNode | string;
  helpText?: string;
  error?: ErrorType;
  flagPosition?: "left" | "right";
  dropdown?: boolean;
  value?: ValueType;
  countries: CountrySchema[],
  loading?: boolean;
  onChange?: (data: { phone: string; country: string }) => void;
  onValid?: (is_valid: boolean) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
}
