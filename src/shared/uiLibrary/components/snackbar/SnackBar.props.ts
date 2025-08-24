import { type ResponsiveBackgroundColorProps } from "@/shared/uiLibrary/utils/types";

export interface SnackBarAction {
  content: string;
  onAction: () => void;
}

export interface SnackBarProps {
  id: string;
  content?: React.ReactNode;
  action?: SnackBarAction;
  duration?: number;
  background?: ResponsiveBackgroundColorProps;
  onClick?: () => void;
}

export interface SnackBarContextType {
  showSnackbar: (toast: Omit<SnackBarProps, "id">) => void;
  removeSnackbar: (id: string) => void;
  snackbar: SnackBarProps[];
  snackbarPosition?: "bottom-left" | "bottom-center" | "bottom-right" | "top-left" | "top-center" | "top-right";
  defaultProps?: Partial<Omit<SnackBarProps, "id">>;
}
