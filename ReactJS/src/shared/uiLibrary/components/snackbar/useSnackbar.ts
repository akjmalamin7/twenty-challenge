import { type ReactNode, useContext } from "react";
import { SnackBarContext } from "./SnackBarProvider";

export function useSnackbar() {
  const context = useContext(SnackBarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackBarProvider");
  }

  const { showSnackbar } = context;

  const snackbar = {
    show: showSnackbar,

    error: (content: ReactNode, options?: Partial<Omit<Parameters<typeof showSnackbar>[0], "content">>) =>
      showSnackbar({
        content,
        background: "danger",
        ...options,
      }),

    success: (
      content: ReactNode,
      options?: Partial<Omit<Parameters<typeof showSnackbar>[0], "content" | "background">>
    ) =>
      showSnackbar({
        content,
        background: "white",
        ...options,
      }),

    info: (content: ReactNode, options?: Partial<Omit<Parameters<typeof showSnackbar>[0], "content" | "background">>) =>
      showSnackbar({
        content,
        background: "white",
        ...options,
      }),

    warning: (
      content: ReactNode,
      options?: Partial<Omit<Parameters<typeof showSnackbar>[0], "content" | "background">>
    ) =>
      showSnackbar({
        content,
        background: "white",
        ...options,
      }),

    message: (
      content: ReactNode,
      options?: Partial<Omit<Parameters<typeof showSnackbar>[0], "content" | "background">>
    ) =>
      showSnackbar({
        content,
        background: "white",
        ...options,
      }),
  };

  return snackbar;
}
