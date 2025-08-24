import { CrossLineIcon } from "@/shared/uiLibrary/assets/icons/crossLineIcon";
import "@/shared/uiLibrary/assets/scss/atoms/modal.scss";
import { generateMarginPaddingRadius } from "@/shared/uiLibrary/utils/dynamicClass";
import type { ResponsiveSideProps } from "@/shared/uiLibrary/utils/types";
import classNames from "classnames";
import _ from "lodash";
import { forwardRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Button } from "../button";
import { Text } from "../text";

type Sizes = "sm" | "md" | "lg";
type Color = "primary" | "secondary" | "success" | "info" | "warning" | "danger" | "white" | "blue";
type Variant = "solid" | "outline" | "fill" | "plain" | "link";

type PrimaryActionProps = {
  content: React.ReactNode;
  variation?: Variant;
  color?: Color;
  size?: Sizes;
  disabled?: boolean;
  loading?: boolean;
  onAction?: () => void;
};
type SecondaryActionProps = {
  content: React.ReactNode;
  variation?: Variant;
  color?: Color;
  size?: Sizes;
  disabled?: boolean;
  loading?: boolean;
  onAction?: () => void;
};

export interface ModalProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  children?: React.ReactNode;
  activator?: React.ReactNode;
  title?: React.ReactNode | string;
  primaryAction?: PrimaryActionProps;
  secondaryAction?: SecondaryActionProps;
  buttons?: React.ReactNode;
  open?: boolean;
  headerPadding?: ResponsiveSideProps;
  bodyPadding?: ResponsiveSideProps;
  footerPadding?: ResponsiveSideProps;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  scroll?: boolean;
  onClose?: () => void;
}

const Modal = forwardRef<HTMLDivElement, ModalProps>((props, ref) => {
  const {
    children,
    activator,
    title,
    primaryAction,
    secondaryAction,
    buttons,
    open,
    headerPadding = { xs: 60 },
    bodyPadding = { xs: 60 },
    footerPadding = { xs: 60 },
    size = "md",
    onClose,
    scroll = true,
    ...rest
  } = props;

  const headerPaddingClasses = generateMarginPaddingRadius(headerPadding, "p");
  const bodyPaddingClasses = generateMarginPaddingRadius(bodyPadding, "p");
  const footerPaddingClasses = generateMarginPaddingRadius(footerPadding, "p");

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Activator button or element */}
      {/* This is the button or element that triggers the modal to open */}
      {/* If activator is provided, it will be rendered before the modal content */}
      {activator && activator}

      {/* Modal content */}
      {/* If open is false, do not render the modal */}
      {/* If open is true, render the modal with the provided content */}
      {open &&
        createPortal(
          <div
            className={classNames("modal")}
            ref={ref}
            {...rest}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            {/*****************************
             * Modal backdrop
             * This is the background overlay for the modal
             * It covers the entire viewport when the modal is open
             ****************************** */}
            <div className="modal--overlay" onClick={onClose}></div>

            {/*****************************
             * Modal container
             * This is the main container for the modal content
             * It includes the header, body, and footer sections
             ****************************** */}

            <div className={classNames("modal--container", size && `modal--size-${size}`)}>
              {/*****************************
               * Modal header with title and close button
               * The header includes the title and a close button
               ****************************** */}
              <div className={classNames("modal--header", headerPaddingClasses)}>
                {
                  title && (
                    <div className="modal--title">
                      {
                        _.isString(title) ? <Text as="h5" weight="semibold">
                          {title}
                        </Text> : title
                      }
                    </div>
                  )
                }
                <div className="modal--close-button">
                  <Button variant="plain" onClick={onClose} size="sm" aria-label="Close Modal">
                    <CrossLineIcon />
                  </Button>
                </div>
              </div>

              {/*****************************
               * Modal body
               * This is the main content area of the modal
               * It can contain any React nodes passed as children
               ****************************** */}
              {children && <div className={classNames("modal--body", bodyPaddingClasses, { ['modal--body-scroll']: scroll })}>{children}</div>}

              {/*****************************
               * Modal footer with actions
               * If primaryAction or secondaryAction are provided, render them in the footer
               * Optional buttons can also be rendered in the footer
               ****************************** */}
              <div className={classNames("modal--footer", footerPaddingClasses)}>
                {/*****************************
                 * Custom footer buttons
                 * If buttons prop is provided, render them in the footer
                 ****************************** */}
                <div className="modal--footer-custom--buttons">{buttons}</div>
                {/*****************************
                 * Default footer buttons
                 * If primaryAction or secondaryAction are provided, render them as buttons
                 ****************************** */}
                <div className="modal--footer-default--buttons">
                  {secondaryAction && (
                    <Button
                      size={secondaryAction.size || "sm"}
                      loading={secondaryAction.loading}
                      disabled={secondaryAction.disabled}
                      variant={secondaryAction.variation}
                      color={secondaryAction.color}
                      onClick={secondaryAction.onAction}
                    >
                      {secondaryAction.content}
                    </Button>
                  )}
                  {primaryAction && (
                    <Button
                      size={primaryAction.size || "sm"}
                      loading={primaryAction.loading}
                      disabled={primaryAction.disabled}
                      variant={primaryAction.variation}
                      color={primaryAction.color}
                      onClick={primaryAction.onAction}
                    >
                      {primaryAction.content}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
});

Modal.displayName = "Modal";
export default Modal;
