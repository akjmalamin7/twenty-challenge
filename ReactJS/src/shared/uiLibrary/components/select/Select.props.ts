/*************************
 * Type definition
 *************************/
type ErrorType = {
  status: boolean;
  message: string;
};
type Options = {
  value: string;
  name: string;
};
export type Sizes = "xs" | "sm" | "md" | "lg";
/*************************
 * Component props
 *************************/
export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size" | "onSelect"> {
  size?: { xs?: Sizes; sm?: Sizes; md?: Sizes; lg?: Sizes } | Sizes;
  name?: string;
  label?: React.ReactNode | string;
  labelAction?: React.ReactNode | string;
  helpText?: string;
  error?: ErrorType;
  value?: string;
  options: Options[];
  onSelect?: (value: string) => void;
}
