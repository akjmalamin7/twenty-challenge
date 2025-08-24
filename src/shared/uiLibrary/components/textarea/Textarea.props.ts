import type { RadiusProps, ResponsiveRadiusSideProps } from "@/shared/uiLibrary/utils/types";

type ErrorType = {
  status: boolean;
  message: string;
};
type Sizes = "sm" | "md" | "lg";
type NativeTextareaProps = Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size">;
export interface TextareaProps extends NativeTextareaProps {
  size?: { sm?: Sizes; md?: Sizes; lg?: Sizes } | Sizes;
  label?: React.ReactNode | string;
  labelAction?: React.ReactNode;
  labelHidden?: boolean;
  error?: ErrorType;
  radius?: RadiusProps | ResponsiveRadiusSideProps;
  resize?: boolean;
  helpText?: string | React.ReactNode;
}
