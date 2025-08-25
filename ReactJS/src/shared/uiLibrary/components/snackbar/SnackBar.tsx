import { CrossLineIcon } from "@/shared/uiLibrary/assets/icons";
import "@/shared/uiLibrary/assets/scss/atoms/snackBar.scss";
import { getResponsiveClasses } from "@/shared/uiLibrary/utils/dynamicClass";
import classNames from "classnames";
import _ from "lodash";
import React from "react";
import { Button } from "../button";
import { Text } from "../text";
import type { SnackBarProps } from "./SnackBar.props";

const SnackBar: React.FC<SnackBarProps & { onDismiss: () => void }> = ({
  content,
  action,
  background = "white",
  onClick,
  onDismiss,
}) => {
  const snackBarClasses = classNames("snackbar", getResponsiveClasses("bg", background));
  return (
    <div className={snackBarClasses} onClick={onClick} role="alert">
      {!action?.content && (
        <div className="snackbar--content">
          {_.isString(content) ? (
            <Text size="md" weight="regular" alignment="start" color={background === "white" ? "primary" : "white"}>
              {" "}
              {content}
            </Text>
          ) : (
            content
          )}
        </div>
      )}

      {action && (
        <Button
          variant="plain"
          className="snackbar--action"
          onClick={(e) => {
            e.stopPropagation();
            action.onAction();
          }}
        >
          <Text size="md" weight="medium" alignment="start">
            {" "}
            {action.content}
          </Text>
        </Button>
      )}

      <Button
        className="snackbar--close"
        color={background === "white" ? "white" : "primary"}
        onClick={(e) => {
          e.stopPropagation();
          onDismiss();
        }}
      >
        <CrossLineIcon color={background === "white" ? "#303030" : "#ffffff"} />
      </Button>
    </div>
  );
};

export default SnackBar;
