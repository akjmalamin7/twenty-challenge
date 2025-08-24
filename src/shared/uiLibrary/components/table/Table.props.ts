import type {
  ResponsiveTableBorderProps,
  ResponsiveTableScrolledProps,
  ResponsiveTableStickyProps,
  ResponsiveTableStripedColorProps,
  ResponsiveTextAlignProps,
  TableBorderProps,
  TableScrolledProps,
  TableStickyProps,
  TableStripedColorProps,
} from "@/shared/uiLibrary/utils/types";

export interface Columns<D extends DataSource = DataSource> {
  key: string;
  title: string;
  dataIndex: string;
  align?: ResponsiveTextAlignProps;
  width?: number;
  colSpan?: number | ((record: D, rowIndex: number) => number);
  rowSpan?: number | ((record: D, rowIndex: number) => number);
  render?: (value: D) => React.ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface DataSource extends Record<PropertyKey, any> {
  key: string;
}

type Sizes = "xs" | "sm" | "md" | "lg";
export interface TableProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: { xs?: Sizes; sm?: Sizes; md?: Sizes; lg?: Sizes } | Sizes;
  width?: string;
  textAlign?: ResponsiveTextAlignProps;
  columns?: Columns[];
  dataSource?: DataSource[];
  hover?: boolean;
  transparent?: boolean;
  striped?: ResponsiveTableStripedColorProps | TableStripedColorProps;
  loading?: boolean;
  scroll?: ResponsiveTableScrolledProps | TableScrolledProps;
  sticky?: ResponsiveTableStickyProps | TableStickyProps;
  border?: ResponsiveTableBorderProps | TableBorderProps;
  onRow?: (value: DataSource) => void;
}
