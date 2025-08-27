import React from 'react';
import type { Placement } from "../../utils/types";
export type AlignPopover = "start" | "end";

export interface PopoverProps extends React.ComponentProps<'div'> {
  activator?: React.ReactNode;
  children?: React.ReactNode;
  popoverBtnClass?: string;
  placement?: Placement;
  active?: boolean;
  align?: AlignPopover

}