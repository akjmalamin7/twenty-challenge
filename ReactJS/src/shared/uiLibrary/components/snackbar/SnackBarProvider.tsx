import "@/shared/uiLibrary/assets/scss/atoms/snackBar.scss";
import classNames from "classnames";
import React, { useCallback, useReducer } from "react";
import SnackBar from "./SnackBar";
import type { SnackBarContextType, SnackBarProps } from "./SnackBar.props";
import { SnackBarContext } from "./SnackBarContext";
import { snackBarReducer } from "./snackBarReducer";
// Create context

export interface SnackBarProviderProps {
  children: React.ReactNode;
  snackbarPosition?: SnackBarContextType["snackbarPosition"];
  defaultProps?: Partial<Pick<SnackBarProps, "background" | "duration">>;
}

const SnackBarProvider: React.FC<SnackBarProviderProps> = ({
  children,
  snackbarPosition = "bottom-center",
  defaultProps = {},
}) => {
  const [snackbar, dispatch] = useReducer(snackBarReducer, []);

  const showSnackbar = useCallback(
    (snackBar: Omit<SnackBarProps, "id">) => {
      const id = Math.random().toString(36).substring(2, 9);
      const duration = snackBar.duration ?? defaultProps.duration ?? 5000;

      dispatch({ type: "ADD", snackBar: { id, ...defaultProps, ...snackBar } });

      setTimeout(() => {
        dispatch({ type: "REMOVE", id });
      }, duration);
    },
    [defaultProps]
  );

  const removeSnackbar = useCallback((id: string) => {
    dispatch({ type: "REMOVE", id });
  }, []);

  return (
    <SnackBarContext.Provider value={{ showSnackbar, removeSnackbar, snackbar, snackbarPosition }}>
      {children}

      <div className={classNames("snackbar--wrapper", `snackbar--${snackbarPosition}`)} aria-live="assertive">
        {snackbar.map((snack) => (
          <SnackBar key={snack.id} {...snack} onDismiss={() => removeSnackbar(snack.id)} />
        ))}
      </div>
    </SnackBarContext.Provider>
  );
};

export default SnackBarProvider;
