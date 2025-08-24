
import "@/shared/uiLibrary/assets/scss/atoms/list.scss";
import { generateMarginPaddingRadius, getResponsiveClasses } from "@/shared/uiLibrary/utils/dynamicClass";
import type { DisplayProps, FlexDirectionProps, FlexWrapProps, ResponsiveAlignContentProps, ResponsiveAlignItemsProps, ResponsiveDisplayProps, ResponsiveFlexDirectionProps, ResponsiveFlexWrapProps, ResponsiveGapProps, ResponsiveGapXProps, ResponsiveGapYProps, ResponsiveJustifyContentProps, ResponsiveJustifyItemsProps, ResponsiveJustifySelfProps, ResponsiveSideProps, SpaceProps } from "@/shared/uiLibrary/utils/types";
import classNames from "classnames";
import type { ForwardRefExoticComponent, RefAttributes } from "react";
import { forwardRef } from "react";

type ListFC = ForwardRefExoticComponent<Omit<ListProps, "ref"> & RefAttributes<HTMLUListElement>> & {
  Item: typeof ListItem;
};

export interface ListProps extends React.ComponentProps<"ul"> {
  children?: React.ReactNode;
  type?: "bullet" | "number" | "extraTight" | "none";
  display?: ResponsiveDisplayProps | DisplayProps;
  flexWrap?: ResponsiveFlexWrapProps | FlexWrapProps;
  flexDirection?: ResponsiveFlexDirectionProps | FlexDirectionProps;
  gap?: ResponsiveGapProps | SpaceProps;
  gapX?: ResponsiveGapXProps | SpaceProps;
  gapY?: ResponsiveGapYProps | SpaceProps;

  justifyContent?: ResponsiveJustifyContentProps;
  alignItems?: ResponsiveAlignItemsProps;
  justifyItems?: ResponsiveJustifyItemsProps;
  justifySelf?: ResponsiveJustifySelfProps;
  alignContent?: ResponsiveAlignContentProps;
  padding?: ResponsiveSideProps;
}

const List = forwardRef<HTMLUListElement, ListProps>(({ children, type = "none", display, flexWrap, flexDirection, gap, gapX, gapY, justifyContent, alignContent, alignItems, justifyItems, justifySelf, padding, className, ...props }, ref) => {
  const listClasses = classNames(
    'list',
    className,
    { [`list--type-${type}`]: type },
    generateMarginPaddingRadius(padding, "p"),
    getResponsiveClasses("display", display),
    getResponsiveClasses("flex-wrap", flexWrap),
    getResponsiveClasses("flex-direction", flexDirection),
    getResponsiveClasses("justify-content", justifyContent),
    getResponsiveClasses("justify-items", justifyItems),
    getResponsiveClasses("justify-self", justifySelf),
    getResponsiveClasses("align-items", alignItems),
    getResponsiveClasses("align-content", alignContent),
    getResponsiveClasses("gap", gap),
    getResponsiveClasses("gap-x", gapX),
    getResponsiveClasses("gap-y", gapY),
  )
  return (
    <ul
      ref={ref}
      className={listClasses}
      {...props}
    >
      {children}
    </ul>
  );
}) as ListFC;

export interface ListItemProps extends React.ComponentProps<"li"> {
  children?: React.ReactNode | string;
}

const ListItem = forwardRef<HTMLLIElement, ListItemProps>(({ children, className, ...props }, ref) => {
  return (
    <li ref={ref} className={classNames("list--item", className)} {...props}>
      {children}
    </li>
  );
});
ListItem.displayName = "ListItem";

List.Item = ListItem;
List.displayName = "List";

export default List;
