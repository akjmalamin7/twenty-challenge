import { createContext } from "react";
import type { SnackBarContextType } from "./SnackBar.props";

export const SnackBarContext = createContext<SnackBarContextType | undefined>(undefined);
