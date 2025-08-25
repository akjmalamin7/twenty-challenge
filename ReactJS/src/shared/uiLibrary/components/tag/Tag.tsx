import { CrossLineIcon } from "@/shared/uiLibrary/assets/icons";
import "@/shared/uiLibrary/assets/scss/atoms/tag.scss";
import classNames from "classnames";
import { forwardRef } from "react";
import { Button } from "../button";
import { Text } from "../text";

type BaseProps = React.HTMLAttributes<HTMLDivElement>;
export interface Props extends BaseProps {
  variant?: "default" | "removeAble" | "clickAble" | "withLink" | "removeAbleWithLink";
  children?: React.ReactNode;
  url?: string;
  onClick?: () => void;
}

const Tag = forwardRef<HTMLDivElement, Props>(
  ({ variant = "default", children, url, onClick, className, ...rest }, ref) => {
    const shouldHaveClick = variant === "clickAble";

    const renderTagContent = () => {
      switch (variant) {
        case "removeAble":
          return (
            <>
              <Text size="sm" weight="regular">
                {children}
              </Text>
              <Button variant="plain" color="white" onClick={onClick} aria-label="Remove tag">
                <CrossLineIcon />
              </Button>
            </>
          );

        case "clickAble":
          return (
            <Button variant="plain" color="white" onClick={onClick}>
              {children}
            </Button>
          );

        case "withLink":
          return (
            <Text type="link" url={url || "#"} size="sm" weight="regular" color="primary">
              {children}
            </Text>
          );

        case "removeAbleWithLink":
          return (
            <>
              <Text type="link" url={url || "#"} size="sm" weight="regular" color="primary">
                {children}
              </Text>
              <Button variant="plain" color="white" onClick={onClick} aria-label="Remove tag">
                <CrossLineIcon />
              </Button>
            </>
          );

        default:
          return (
            <Text size="sm" weight="regular">
              {children}
            </Text>
          );
      }
    };

    return (
      <div
        ref={ref}
        className={classNames("tag", `tag--${variant}`, className)}
        {...(shouldHaveClick ? { onClick } : {})}
        {...rest}
      >
        <div className="tag--inner">{renderTagContent()}</div>
      </div>
    );
  }
);

Tag.displayName = "Tag";
export default Tag;
