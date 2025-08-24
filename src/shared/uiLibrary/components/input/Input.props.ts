/*************************
 * Type definition
 *************************/
export type ErrorType = {
  status: boolean;
  message: string;
};

export type Sizes = "xs" | "sm" | "md" | "lg";

/*************************
 * Omit native conflicting attributes
 *************************/
export type NativeInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "prefix" | "suffix">;
/*************************
 * Component Props
 *************************/
export interface InputProps extends NativeInputProps {
  size?: { xs?: Sizes; sm?: Sizes; md?: Sizes; lg?: Sizes } | Sizes;
  label?: React.ReactNode | string;
  helpText?: string;
  labelHidden?: boolean;
  error?: ErrorType;
  isLoading?: boolean;
  labelAction?: React.ReactNode;
  prefix?: React.ReactNode | string;
  prefixSeparator?: boolean;
  suffix?: React.ReactNode | string;
  suffixSeparator?: boolean;
  radius?: string;
  hideArrow?: boolean;
  className?: string;
}
