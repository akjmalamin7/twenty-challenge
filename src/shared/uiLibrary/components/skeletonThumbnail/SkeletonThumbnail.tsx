import "@/shared/uiLibrary/assets/scss/atoms/skeletonThumbnail.scss";
import { getResponsiveClasses } from "@/shared/uiLibrary/utils/dynamicClass";
import classNames from "classnames";
import { forwardRef } from "react";

type Sizes = "xs" | "sm" | "md" | "lg" | "auto";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  size?:
  | Sizes
  | {
    xs?: Sizes;
    sm?: Sizes;
    md?: Sizes;
    lg?: Sizes;
    auto?: Sizes;
  };
}

const SkeletonThumbnail = forwardRef<HTMLDivElement, SkeletonProps>((props, ref) => {
  const { size = "md", ...rest } = props;
  const skeletonSizes = getResponsiveClasses("skeleton--thumbnail-placeholder", size);
  return (
    <div className={"skeleton"}>
      <div className={classNames("skeleton--thumbnail-placeholder", skeletonSizes)} ref={ref} {...rest} />
    </div>
  );
});

SkeletonThumbnail.displayName = "SkeletonThumbnail";

export default SkeletonThumbnail;
