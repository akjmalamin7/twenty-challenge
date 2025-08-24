import "@/shared/uiLibrary/assets/scss/atoms/table.scss";
import { getResponsiveClasses } from "@/shared/uiLibrary/utils/dynamicClass";
import type { ResponsiveTextAlignProps } from "@/shared/uiLibrary/utils/types";
import classNames from "classnames";
import { isFunction } from "lodash";
import React, { forwardRef } from "react";
import { Spinner } from "../spinner";
import { Text } from "../text";
import type { TableProps } from "./Table.props";

const Table = forwardRef<HTMLDivElement, TableProps>((props, ref) => {
  const {
    size = "md",
    columns = [],
    dataSource = [],
    hover,
    transparent,
    striped = "none",
    loading,
    scroll = "none",
    sticky,
    border = "borderLess",
    onRow,
    ...rest
  } = props;

  const tableSizes = getResponsiveClasses("table", size);
  const alignItemsClasses = (align?: ResponsiveTextAlignProps) => getResponsiveClasses("text-align", align);
  const borderClasses = getResponsiveClasses("table", border);
  const scrollClasses = getResponsiveClasses("table", scroll);
  const stripedClasses = getResponsiveClasses("table-stripe", striped);
  const stickyClasses = getResponsiveClasses("table-sticky", sticky);

  const tableClasses = classNames("table", scrollClasses);
  const tableHeaderClasses = classNames("table--head", {
    "table--head-transparent": transparent,
  });
  const tableBodyRowClasses = classNames("table--row", stripedClasses, {
    hover: hover,
  });

  return (
    <div {...rest} ref={ref} className={tableClasses}>
      <table className={classNames("table--element", tableSizes, borderClasses)}>
        {/*********************************
         * Table header
         **********************************/}
        <thead className={tableHeaderClasses}>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={classNames(stickyClasses, alignItemsClasses(column.align))}
                style={{
                  width: column.width ? `${column.width}px` : sticky === "sticky" ? "" : "auto",
                }}
              >
                <Text size="sm" weight="semibold" color="tertiary" alignment={column.align}>
                  {column.title}
                </Text>
              </th>
            ))}
          </tr>
        </thead>
        {/*********************************
         * Table header
         **********************************/}
        <tbody className="table--body">
          {loading ? (
            <tr>
              <td colSpan={columns.length}>
                <Spinner size="md" />
              </td>
            </tr>
          ) : (
            dataSource.map((data, rowIndex) => (
              <tr key={data.key} className={tableBodyRowClasses} onClick={() => isFunction(onRow) && onRow(data)}>
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={classNames("", stickyClasses, alignItemsClasses(column.align), {
                      cursor_pointer: isFunction(onRow),
                    })}
                    style={{
                      width: column.width ? `${column.width}px` : "auto",
                    }}
                    colSpan={typeof column.colSpan === "function" ? column.colSpan(data, rowIndex) : column.colSpan}
                    rowSpan={typeof column.rowSpan === "function" ? column.rowSpan(data, rowIndex) : column.rowSpan}
                  >
                    {column.render ? (
                      column.render(data)
                    ) : React.isValidElement(data[column.dataIndex]) ? (
                      data[column.dataIndex]
                    ) : (
                      <Text size={"sm"} weight="regular" color="tertiary" alignment={column.align}>
                        {data[column.dataIndex]}
                      </Text>
                    )}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
});
export default Table;
