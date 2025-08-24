import "@/shared/uiLibrary/assets/scss/atoms/grid.scss";
import { getResponsiveClasses } from "@/shared/uiLibrary/utils/dynamicClass";
import classNames from "classnames";
import { forwardRef } from "react";
import type { ColProps, GridProps } from "./Grid.props";
/*************************
 *  Column component
 *************************/
const Col = forwardRef<HTMLDivElement, ColProps>((props, ref) => {
  const {
    children,
    order,
    alignContent,

    colSpan,
    colStart,
    colEnd,
    colAuto,
    colSpanFull,

    rowAuto,
    rowSpanFull,
    rowSpan,
    rowEnd,
    rowStart,
    className,
    ...rest
  } = props;

  /*************************
   * Generate dynamic classes
   *************************/
  const colClasses = classNames(
    "grid--col", className,
    getResponsiveClasses("col-span", colSpan),
    getResponsiveClasses("col-start", colStart),
    getResponsiveClasses("col-end", colEnd),
    getResponsiveClasses("col-span", colSpanFull),
    getResponsiveClasses("col", colAuto),
    getResponsiveClasses("row-end", rowEnd),
    getResponsiveClasses("row-start", rowStart),
    getResponsiveClasses("row", rowAuto),
    getResponsiveClasses("row-span", rowSpanFull),
    getResponsiveClasses("row-span", rowSpan),
    getResponsiveClasses('order', order),
    getResponsiveClasses('align-content', alignContent),
  );
  /*************************
   * Render component
   *************************/
  return (
    <div className={colClasses} ref={ref} {...rest}>
      {children}
    </div>
  );
});
Col.displayName = "Col";

/*************************
 *  Grid component
 *************************/
const GridBase = forwardRef<HTMLDivElement, GridProps>((props, ref) => {
  const {
    children,
    cols,
    rows,
    gap,
    gapX,
    gapY,
    justifyContent,
    justifyItems,
    justifySelf,
    alignItems,
    alignContent,
    className,
    ...rest
  } = props;

  /*************************
   * Generate dynamic classes
   *************************/

  const gridClasses = classNames(
    "grid",
    className,
    getResponsiveClasses("col", cols),
    getResponsiveClasses("row", rows),
    getResponsiveClasses("justify-content", justifyContent),
    getResponsiveClasses("justify-items", justifyItems),
    getResponsiveClasses("justify-self", justifySelf),
    getResponsiveClasses("align-items", alignItems),
    getResponsiveClasses("align-content", alignContent),
    getResponsiveClasses("gap", gap),
    getResponsiveClasses("gap-x", gapX),
    getResponsiveClasses("gap-y", gapY)
  );

  /*************************
   * Component render
   *************************/
  return (
    <div className={gridClasses} ref={ref} {...rest}>
      {children}
    </div>
  );
});
GridBase.displayName = "Grid";

/*************************
 * Type: extend Grid with Col
 *************************/
type GridComponent = typeof GridBase & {
  Col: typeof Col;
};

/*************************
 * Attach Col to Grid
 *************************/
const Grid = GridBase as GridComponent;
Grid.Col = Col;

export default Grid;
