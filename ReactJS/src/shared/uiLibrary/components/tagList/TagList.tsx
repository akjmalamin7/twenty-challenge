import "@/shared/uiLibrary/assets/scss/atoms/tagList.scss";
import { forwardRef } from "react";

export interface TagListProps extends React.ComponentProps<"div"> {
  children?: React.ReactNode;
}

const TagList = forwardRef<HTMLDivElement, TagListProps>((props, ref) => {
  const { children, ...rest } = props;
  return (
    <div className="tag--list" ref={ref} {...rest}>
      {children}
    </div>
  );
});
TagList.displayName = "TagList";
export default TagList;
