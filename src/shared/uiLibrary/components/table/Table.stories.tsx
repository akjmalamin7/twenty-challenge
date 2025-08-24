import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/internal/test";
import { Badge } from "../badge";
import { Button } from "../button";
import Table from "./Table";
import type { Columns, DataSource } from "./Table.props";

const meta = {
  title: "Example/Table",
  component: Table,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof Table>;

export default meta;

type Story = StoryObj<typeof Table>;
const TableColumns: Columns[] = [
  {
    key: "_id",
    title: "Order id",
    dataIndex: "_id",
    align: "start",
    width: 120,
  },
  {
    key: "fulfillment",
    title: "Fulfillment id",
    dataIndex: "fulfillment",
    align: "center",
    width: 120,
    colSpan: (_: DataSource, rowIndex: number) => (rowIndex === 4 ? 2 : 1),
    rowSpan: (_: DataSource, rowIndex: number) => (rowIndex === 2 ? 2 : 1),
  },
  {
    key: "consignment_id",
    title: "Consignment id",
    dataIndex: "consignment_id",
    align: "center",
    width: 120,
  },
  {
    key: "order_status",
    title: "Order status",
    dataIndex: "order_status",
    align: "center",
  },
  {
    key: "delivery_charge",
    title: "Delivery fee",
    dataIndex: "delivery_charge",
    align: "center",
  },
  {
    key: "cod_amount",
    title: "Cash to Collect",
    dataIndex: "cod_amount",
    align: "end",
    width: 120,
  },
];
const dataSource = [
  {
    key: "1",
    _id: "ORD123456",
    fulfillment: "FUL987654",
    consignment_id: "CON123789",
    order_status: <Badge variant="warning">Pending</Badge>,
    delivery_charge: "50 TK",
    cod_amount: "1000 TK",
  },
  {
    key: "2",
    _id: "ORD123457",
    fulfillment: <Button>"FUL987655"</Button>,
    consignment_id: "CON123790",
    order_status: "Shipped",
    delivery_charge: "60 TK",
    cod_amount: "1500 TK",
  },
  {
    key: "3",
    _id: "ORD123458",
    fulfillment: "",
    consignment_id: "CON123791",
    order_status: "Delivered",
    delivery_charge: "45 TK",
    cod_amount: "1200 TK",
  },
  {
    key: "4",
    _id: "ORD123459",
    fulfillment: "",
    consignment_id: "CON123791",
    order_status: "Delivered",
    delivery_charge: "45 TK",
    cod_amount: "1200 TK",
  },
  {
    key: "5",
    _id: "ORD123460",
    fulfillment: "",
    consignment_id: "CON123791",
    order_status: "Delivered",
    delivery_charge: "45 TK",
    cod_amount: "1200 TK",
  },
  {
    key: "6",
    _id: "ORD123461",
    fulfillment: "FUL987656",
    consignment_id: "CON123791",
    order_status: "Delivered",
    delivery_charge: "45 TK",
    cod_amount: "1200 TK",
  },
];

export const TableDefault: Story = {
  args: {
    transparent: false,
    hover: true,
    columns: TableColumns,
    dataSource: dataSource,
    size: "lg",
    scroll: "scroll",
    /* TODO: any type should be change */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onRow: (value: any) => {
      console.log(value);
    },
    striped: "none",
  },
};
export const TableStriped: Story = {
  args: {
    size: { xs: "xs" },
    columns: TableColumns,
    dataSource: dataSource,
    striped: {
      xs: "striped",
      sm: "none",
      md: "striped",
      lg: "none",
      xl: "striped",
    },
  },
};
export const TableBordered: Story = {
  args: {
    size: { xs: "xs" },
    columns: TableColumns,
    dataSource: dataSource,
    border: "bordered",
  },
};
export const TableBorderLess: Story = {
  args: {
    size: { xs: "xs" },
    columns: TableColumns,
    dataSource: dataSource,
    border: "border-less",
  },
};

export const TableResponsiveBordered: Story = {
  args: {
    size: { xs: "xs" },
    columns: TableColumns,
    dataSource: dataSource,
    border: { xs: "bordered", sm: "bordered" },
  },
};

export const TableScroll: Story = {
  args: {
    size: { xs: "xs" },
    columns: TableColumns,
    dataSource: dataSource,
    scroll: "scroll",
  },
};
export const TableSticky: Story = {
  args: {
    size: { xs: "xs" },
    columns: TableColumns,
    dataSource: dataSource,
  },
};
export const TableXs: Story = {
  args: {
    size: { xs: "xs" },
  },
};
export const TableSm: Story = {
  args: {
    size: { xs: "xs", sm: "sm" },
  },
};
export const TableMd: Story = {
  args: {
    size: { xs: "xs", sm: "sm", md: "md" },
  },
};
export const TableLg: Story = {
  args: {
    size: { xs: "xs", sm: "sm", md: "md", lg: "lg" },
  },
};
