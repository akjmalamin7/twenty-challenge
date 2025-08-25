import type {
  OrderProps,
  ResponsiveAlignContentProps,
  ResponsiveAlignItemsProps,
  ResponsiveColAuto,
  ResponsiveColSpan,
  ResponsiveColSpanEnd,
  ResponsiveColSpanFull,
  ResponsiveColSpanStart,
  ResponsiveColsProps,
  ResponsiveGapProps,
  ResponsiveGapXProps,
  ResponsiveGapYProps,
  ResponsiveJustifyContentProps,
  ResponsiveJustifyItemsProps,
  ResponsiveJustifySelfProps,
  ResponsiveOrderProps,
  ResponsiveRowSpan,
  ResponsiveRowSpanAuto,
  ResponsiveRowSpanEnd,
  ResponsiveRowSpanFull,
  ResponsiveRowSpanStart,
  ResponsiveRowsProps,
} from "@/shared/uiLibrary/utils/types";

/*************************
 * Grid Props
 *************************/
export interface GridProps extends React.ComponentProps<"div"> {
  children?: React.ReactNode;
  /* col */
  cols?: ResponsiveColsProps;
  /* rows */
  rows?: ResponsiveRowsProps;
  /* gap */
  gap?: ResponsiveGapProps;
  gapX?: ResponsiveGapXProps;
  gapY?: ResponsiveGapYProps;
  justifyContent?: ResponsiveJustifyContentProps;
  alignItems?: ResponsiveAlignItemsProps;
  justifyItems?: ResponsiveJustifyItemsProps;
  justifySelf?: ResponsiveJustifySelfProps;
  alignContent?: ResponsiveAlignContentProps;
}

/*************************
 * Col Props
 *************************/

export interface ColProps extends React.ComponentProps<"div"> {
  children?: React.ReactNode;
  order?: ResponsiveOrderProps | OrderProps;
  alignContent?: ResponsiveAlignContentProps;
  /* col */
  colSpanFull?: ResponsiveColSpanFull;
  colAuto?: ResponsiveColAuto;
  colStart?: ResponsiveColSpanStart;
  colEnd?: ResponsiveColSpanEnd;
  colSpan?: ResponsiveColSpan;

  /* row */
  rowSpanFull?: ResponsiveRowSpanFull;
  rowAuto?: ResponsiveRowSpanAuto;
  rowSpan?: ResponsiveRowSpan;
  rowStart?: ResponsiveRowSpanStart;
  rowEnd?: ResponsiveRowSpanEnd;
}
