export const allowedBreakpoints = ["xs", "sm", "md", "lg", "xl"] as const;
export type Breakpoint = (typeof allowedBreakpoints)[number];
export type Responsive<T> = Partial<Record<Breakpoint, T>>;
export interface Range {
  start: string | null;
  end: string | null;
}
/*************************
 * Popover
 *************************/
export interface EventType {
  date?: string; // specific date
  label: string;
  type?: "holiday" | "birthday" | "meeting";
  weekdays?: number[]; // 0=Sun, 1=Mon, ..., 6=Sat
}
export type Placement = "top" | "bottom" | "left" | "right";
export const OppositePlacement: Record<Placement, Placement> = {
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left",
};

export interface EventType {
  date?: string; // specific date
  label: string;
  type?: "holiday" | "birthday" | "meeting";
  weekdays?: number[]; // 0=Sun, 1=Mon, ..., 6=Sat
}
export interface ColorStop {
  color: string;
  position: string;
}
export type HSBType = {
  h: number; // Hue: 0 থেকে 360 ডিগ্রি
  s: number; // Saturation: 0 থেকে 100 শতাংশ
  b: number; // Brightness: 0 থেকে 100 শতাংশ
  a: number; // Alpha (opacity): 0 থেকে 1 (optional)
};
/*************************
 * No responsive props type
 *************************/
export type RadiusProps =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 50;
export type SpaceProps = 0 | 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 100 | 110 | 120 | 130 | 140 | 150 | 160;
export type ColNumbersProps = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type ColStringProps = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "auto";
export type TextAlignProps = "start" | "center" | "end" | "justify" | "inherit" | "initial";

export type FlexDirectionProps = "row" | "row-reverse" | "col" | "col-reverse" | "initial" | "inherit";
export type JustifyContentProps =
  | "start"
  | "end"
  | "safe-end"
  | "center"
  | "safe-center"
  | "space-between"
  | "space-around"
  | "space-evenly"
  | "stretch"
  | "baseline"
  | "normal"
  | "initial"
  | "inherit";

export type AlignItemsProps =
  | "normal"
  | "stretch"
  | "center"
  | "safe-center"
  | "start"
  | "end"
  | "safe-end"
  | "baseline"
  | "initial"
  | "inherit";

export type JustifyItemsProps = "start" | "end" | "safe-end" | "center" | "safe-center" | "stretch" | "normal";
export type JustifySelfProps =
  | "self-auto"
  | "self-start"
  | "self-center"
  | "self-center-safe"
  | "self-end"
  | "self-end-safe"
  | "self-stretch";
export type AlignContentProps =
  | "normal"
  | "center"
  | "start"
  | "end"
  | "space-between"
  | "space-around"
  | "space-evenly"
  | "baseline"
  | "stretch";
export type ColorProps =
  | "primary"
  | "secondary"
  | "tertiary"
  | "success"
  | "info"
  | "warning"
  | "danger"
  | "white"
  | "blue"
  | "transparent";
export type BackgroundColorProps =
  | "primary"
  | "secondary"
  | "tertiary"
  | "success"
  | "info"
  | "warning"
  | "danger"
  | "white"
  | "blue"
  | "transparent";
export type PositionProps = "relative" | "absolute" | "fixed" | "sticky" | "inherit" | "static";
export type FlexWrapProps = "nowrap" | "wrap" | "wrap-reverse" | "initial" | "inherit";

export type OrderProps = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type ShadowSize = "none" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
export type ShadowProps = "none" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
export type OverflowProps = "hidden" | "scroll" | "clip" | "auto" | "visible";
export type BorderWidthProps = 1 | 2 | 3 | 4 | 5;
export type BorderStyleProps =
  | "dashed"
  | "dotted"
  | "solid"
  | "double"
  | "groove"
  | "ridge"
  | "inset"
  | "none"
  | "hidden";
export type BooleanProps = true | false;
export type AllowedElementsProps = "p" | "span" | "section" | "div" | "legend" | "ul" | "li" | "a" | "form" | "nav";

export type AllowedTextElementsProps = "p" | "span" | "strong" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "a";
export type TextDecorationProps = "default" | "line-through" | "underline" | "overline" | "super-line";
export type TargetProps = "_blank" | "_self" | "_parent" | "_top";
export type FontWeightProps = "regular" | "medium" | "semibold" | "bold";
export type HoverProps = "hover" | "none";
export type TruncateProps =
  | "truncate-1"
  | "truncate-2"
  | "truncate-3"
  | "truncate-4"
  | "truncate-5"
  | "truncate-6"
  | "truncate-7"
  | "truncate-8"
  | "truncate-9"
  | "truncate-10";
export type BreakWordProps =
  | "auto-phrase"
  | "break-all"
  | "break-word"
  | "keep-all"
  | "normal"
  | "inherit"
  | "initial"
  | "revert"
  | "revert-layer"
  | "unset";
export type DividerVariantProps = "default" | "base" | "dark";
export type DisplayProps =
  | "flex"
  | "grid"
  | "block"
  | "inline-block"
  | "inline"
  | "inline-flex"
  | "inline-grid"
  | "contents"
  | "flow"
  | "list-item"
  | "math"
  | "none"
  | "initial"
  | "inherit"
  | "ruby"
  | "table"
  | "inline-table";
/*************************
 * Boolean props type
 *************************/
export type ResponsiveBooleanProps = Responsive<BooleanProps> | BooleanProps;
/*************************
 * Radius props type
 *************************/

export type ResponsiveRadiusProps = RadiusProps | Responsive<RadiusProps>;

export type ResponsiveRadius = RadiusProps | Responsive<RadiusProps>;
export type ResponsiveRadiusSideProps =
  | ResponsiveRadiusProps
  | Partial<Record<"tl" | "tr" | "bl" | "br", ResponsiveRadiusProps>>;

/*************************
 * Table props type
 *************************/
export type TableBorderProps = "bordered" | "border-less";
export type TableStripedColorProps = "striped" | "none";
export type TableScrolledProps = "scroll" | "none";
export type TableStickyProps = "sticky" | "none";

/*************************
 * Text Align Props
 *************************/

export type ResponsiveTextAlignProps = Responsive<TextAlignProps> | TextAlignProps;
/*************************
 * Table Props
 *************************/

export type ResponsiveTableBorderProps = Responsive<TableBorderProps> | TableBorderProps;

export type ResponsiveTableStripedColorProps = Responsive<TableStripedColorProps> | TableStripedColorProps;

export type ResponsiveTableScrolledProps = Responsive<TableScrolledProps> | TableScrolledProps;

export type ResponsiveTableStickyProps = Responsive<TableStickyProps> | TableStickyProps;

/*************************
 * Background Props
 *************************/
export type ResponsiveBackgroundColorProps = Responsive<BackgroundColorProps> | BackgroundColorProps;
/*************************
 * Row Props
 *************************/
export type ResponsiveColsProps = Responsive<ColNumbersProps> | ColNumbersProps;
export type ResponsiveRowsProps = Responsive<ColNumbersProps> | ColNumbersProps;

export type ResponsiveJustifyContentProps = Responsive<JustifyContentProps> | JustifyContentProps;

export type ResponsiveAlignItemsProps = Responsive<AlignItemsProps> | AlignItemsProps;

export type ResponsiveJustifyItemsProps = Responsive<JustifyItemsProps> | JustifyItemsProps;

export type ResponsiveJustifySelfProps = Responsive<JustifySelfProps> | JustifySelfProps;

export type ResponsiveAlignContentProps = Responsive<AlignContentProps> | AlignContentProps;

export type ResponsiveGapProps = Responsive<SpaceProps> | SpaceProps;
export type ResponsiveGapXProps = Responsive<SpaceProps> | SpaceProps;
export type ResponsiveGapYProps = Responsive<SpaceProps> | SpaceProps;

export type ResponsiveFlexWrapProps = Responsive<FlexWrapProps> | FlexWrapProps;
export type ResponsiveFlexDirectionProps = Responsive<FlexDirectionProps> | FlexDirectionProps;
/*************************
 * Col Props
 *************************/
export type ResponsiveColSpanFull = Responsive<"full"> | "full";
export type ResponsiveColAuto = Responsive<"auto"> | "Auto";
export type ResponsiveColSpanStart = Responsive<ColStringProps> | ColStringProps;
export type ResponsiveColSpanEnd = Responsive<ColStringProps> | ColStringProps;
export type ResponsiveColSpan = Responsive<ColStringProps> | ColStringProps;
/* row */
export type ResponsiveRowSpanFull = Responsive<"full"> | "full";
export type ResponsiveRowSpanAuto = Responsive<"auto">;
export type ResponsiveRowSpanStart = Responsive<ColStringProps> | ColStringProps;
export type ResponsiveRowSpanEnd = Responsive<ColStringProps> | ColStringProps;
export type ResponsiveRowSpan = Responsive<ColStringProps> | ColStringProps;

/*************************
 * Order props type
 *************************/
export type ResponsiveOrderProps = Responsive<OrderProps> | OrderProps;
/*************************
 * Shadow props type
 *************************/

export type ResponsiveShadowProps = Responsive<ShadowProps> | ShadowProps;
/*************************
 * Position props type
 *************************/

export type PositionDirectionProps = SpaceProps;
export type ResponsivePositionProps = Responsive<PositionProps> | PositionProps;
export type ResponsivePositionDirectionProps = Responsive<PositionDirectionProps> | PositionDirectionProps;
/*************************
 * Padding props type
 *************************/
export type ResponsiveSpace = SpaceProps | Responsive<SpaceProps>;
export type ResponsiveSideProps =
  | SpaceProps
  | Responsive<SpaceProps>
  | Partial<Record<"top" | "right" | "bottom" | "left" | "px" | "py", ResponsiveSpace>>;
/*************************
 * Overflow props type
 *************************/

export type ResponsiveOverflow = Responsive<OverflowProps>;

export type AxisOverflowProps =
  | OverflowProps
  | ResponsiveOverflow
  | Partial<Record<"x" | "y" | "z", OverflowProps | ResponsiveOverflow>>;
/*************************
 * Background
 *************************/

export type ResponsiveBackgroundProps = Responsive<ColorProps> | ColorProps;
/*************************
 * Color Props
 *************************/

export type ResponsiveColorProps = Responsive<ColorProps> | ColorProps;
/*************************
 * Border
 *************************/

export type ResponsiveBorderStyleProps = Responsive<BorderStyleProps> | BorderStyleProps;

export type ResponsiveBorderWidthProps = Responsive<BorderWidthProps> | BorderWidthProps;
/*************************
 * Border
 *************************/
export type ResponsiveTextDecorationProps = Responsive<TextDecorationProps> | TextDecorationProps;
/*************************
 * Target
 *************************/
export type ResponsiveTargetProps = Responsive<TargetProps> | TargetProps;
/*************************
 * font weight
 *************************/
export type ResponsiveFontWeightProps = Responsive<FontWeightProps> | FontWeightProps;
/*************************
 * Break word, Truncate, Hover
 *************************/
export type ResponsiveBreakWordProps = Responsive<BreakWordProps> | BreakWordProps;
export type ResponsiveTruncateProps = Responsive<TruncateProps> | TruncateProps;
export type ResponsiveHoverProps = Responsive<HoverProps> | HoverProps;

/*************************
 * Divider
 *************************/
export type ResponsiveDividerVariantProps = Responsive<DividerVariantProps> | DividerVariantProps;
/*************************
 * Display
 *************************/
export type ResponsiveDisplayProps = Responsive<DisplayProps> | DisplayProps;
