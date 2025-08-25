import "@/shared/uiLibrary/assets/scss/atoms/listbox.scss";
import classNames from "classnames";
import { type ForwardRefExoticComponent, type ReactNode, type RefAttributes, forwardRef } from "react";
import { BlockStack } from "../blockStack";
import { Box } from "../box";

type ListBoxFC = ForwardRefExoticComponent<Omit<ListBoxProps, "ref"> & RefAttributes<HTMLUListElement>> & {
  Option: typeof Option;
};

export interface ListBoxProps extends React.ComponentProps<"ul"> {
  children?: ReactNode;
  type?: "default" | "withIcon" | "withSearch";
  headerContent?: ReactNode;
}

const ListBox = forwardRef<HTMLUListElement, ListBoxProps>(({ children, type = "default", headerContent, ...props }, ref) => {
  return (
    <BlockStack>
      {
        headerContent && headerContent
      }
      <Box>
        <ul
          ref={ref}
          {...props}
          className={classNames("listbox", {
            [`listbox--type-${type}`]: type,
          })}
        >
          {children}
        </ul>
      </Box>
    </BlockStack>
  );
}) as ListBoxFC;
ListBox.displayName = "Listbox";

export interface OptionProps extends React.ComponentProps<"li"> {
  children?: ReactNode | string;
  isActive?: boolean;
}

const Option = forwardRef<HTMLLIElement, OptionProps>(({ children, isActive, className, onClick, ...props }, ref) => {
  return (
    <li
      ref={ref}
      onClick={onClick}
      className={classNames("listbox--option", className, {
        active: isActive,
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
