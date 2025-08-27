import "@/shared/uiLibrary/assets/scss/atoms/listbox.scss";
import classNames from "classnames";
import { type ForwardRefExoticComponent, type ReactNode, type RefAttributes, forwardRef } from "react";
import { generateRadiusClasses, getResponsiveClasses } from "../../utils/dynamicClass";
import type { RadiusProps, ResponsiveRadiusSideProps } from "../../utils/types";
import { BlockStack } from "../blockStack";
import { Box } from "../box";

type ListBoxFC = ForwardRefExoticComponent<Omit<ListBoxProps, "ref"> & RefAttributes<HTMLUListElement>> & {
  Option: typeof Option;
};

export interface ListBoxProps extends React.ComponentProps<"ul"> {
  children?: ReactNode;
  headerContent?: ReactNode;
  listBoxClass?: string;
}

const ListBox = forwardRef<HTMLUListElement, ListBoxProps>(({ children, headerContent, listBoxClass, ...props }, ref) => {
  return (
    <BlockStack>
      {
        headerContent && headerContent
      }
      <Box>
        <ul
          ref={ref}
          {...props}
          className={classNames("listbox", listBoxClass)}
        >
          {children}
        </ul>
      </Box>
    </BlockStack>
  );
}) as ListBoxFC;
ListBox.displayName = "Listbox";

type Sizes = "xs" | "sm" | "md" | "lg";
export interface OptionProps extends React.ComponentProps<"li"> {
  size?: { xs: Sizes; sm?: Sizes; md?: Sizes; lg?: Sizes } | Sizes;
  children?: ReactNode | string;
  isActive?: boolean;
  radius?: ResponsiveRadiusSideProps | RadiusProps;
  separator?: boolean;
}

const Option = forwardRef<HTMLLIElement, OptionProps>(({ children, isActive, className, radius = 6, separator = false, size = "xs", onClick, ...props }, ref) => {
  return (
    <li
      ref={ref}
      onClick={onClick}
      className={classNames("listbox--option", className, getResponsiveClasses('listbox--option-size', size), !separator && generateRadiusClasses(radius), {
        active: isActive,
        ['list--option-separator']: separator
      })}
      {...props}
    >
      {children}
    </li>
  );
});
Option.displayName = "Listbox.Option";

ListBox.Option = Option;
export default ListBox;
