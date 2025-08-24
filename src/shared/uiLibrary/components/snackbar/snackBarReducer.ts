import type { SnackBarProps } from "./SnackBar.props";

export type SnackBarActionType = { type: "ADD"; snackBar: SnackBarProps } | { type: "REMOVE"; id: string };

export function snackBarReducer(state: SnackBarProps[], action: SnackBarActionType): SnackBarProps[] {
  switch (action.type) {
    case "ADD":
      return [...state, action.snackBar];
    case "REMOVE":
      return state.filter((snackBar) => snackBar.id !== action.id);
    default:
      return state;
  }
}
