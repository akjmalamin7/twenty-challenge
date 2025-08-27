import { OppositePlacement, type Placement } from "@/shared/uiLibrary/utils/types";
import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { AlignPopover, PopoverProps } from "./Popover.props";

const SPACING = 8;
const VIEWPORT_PADDING = 8;

const Popover = forwardRef<HTMLDivElement, PopoverProps>((props) => {
  const {
    activator,
    children,
    placement = "bottom",
    popoverBtnClass,
    align = "start",
    active,
  } = props;
  const wrapperRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const isControlled = active !== undefined;

  const [visible, setVisible] = useState<boolean>(false);
  const [position, setPosition] = useState({ top: -100, left: -100 });
  const [actualPlacement, setActualPlacement] = useState<Placement>(placement);


  /*************************
   * Handle countrolled visibility
   *************************/
  useEffect(() => {
    if (isControlled) setVisible(!!active);
  }, [active, isControlled]);


  const togglePersist = useCallback(() => {
    if (isControlled) return;
    setVisible((prev) => !prev);
  }, [isControlled]);


  /*************************
   * Close on outside click
   *************************/
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node) &&
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setVisible(false);
      }
    };
    if (visible) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [visible]);



  const hasSpace = (pos: Placement, wrapperRect: DOMRect, popoverRect: DOMRect) => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    switch (pos) {
      case "top": return wrapperRect.top >= popoverRect.height + SPACING + VIEWPORT_PADDING;
      case "bottom": return vh - wrapperRect.bottom >= popoverRect.height + SPACING + VIEWPORT_PADDING;
      case "left": return wrapperRect.left >= popoverRect.width + SPACING + VIEWPORT_PADDING;
      case "right": return vw - wrapperRect.right >= popoverRect.width + SPACING + VIEWPORT_PADDING;
    }
  };

  const getCoords = (
    pos: Placement,
    wrapperRect: DOMRect,
    popoverRect: DOMRect,
    align: AlignPopover
  ) => {
    const vw = window.innerWidth;

    switch (pos) {
      case "top":
      case "bottom": {
        let left: number;

        console.log(`left: ${wrapperRect.right - popoverRect.width + window.scrollX} ${popoverRect.width}`)
        if (align === "end") {
          // align right edge of popover with right edge of activator (button)
          left = wrapperRect.right - popoverRect.width + window.scrollX;

          // যদি left side এ কেটে যায়, তখন fallback করবে left থেকে
          if (left < VIEWPORT_PADDING) {
            left = wrapperRect.left + window.scrollX;
          }
        } else {
          // align left edge (default)
          left = wrapperRect.left + window.scrollX;

          // যদি right side এ overflow করে, fallback করবে right থেকে
          if (left + popoverRect.width > vw - VIEWPORT_PADDING) {
            left = wrapperRect.right - popoverRect.width + window.scrollX;
          }
        }

        return {
          top:
            pos === "top"
              ? wrapperRect.top - popoverRect.height - SPACING + window.scrollY
              : wrapperRect.bottom + SPACING + window.scrollY,
          left,
        };
      }

      case "left":
        return {
          top:
            wrapperRect.top +
            wrapperRect.height / 2 -
            popoverRect.height / 2 +
            window.scrollY,
          left: wrapperRect.left - popoverRect.width - SPACING + window.scrollX,
        };

      case "right":
        return {
          top:
            wrapperRect.top +
            wrapperRect.height / 2 -
            popoverRect.height / 2 +
            window.scrollY,
          left: wrapperRect.right + SPACING + window.scrollX,
        };
    }
  };



  /*************************
   * Update position
   *************************/
  const updatePosition = useCallback(() => {
    const wrapper = wrapperRef.current;
    const popover = popoverRef.current;
    if (!wrapper || !popover) return;

    const wrapperRect = wrapper.getBoundingClientRect();
    const popoverRect = popover.getBoundingClientRect();

    let finalPlacement = placement;

    if (!hasSpace(finalPlacement, wrapperRect, popoverRect)) {
      const opposite = OppositePlacement[finalPlacement];
      if (hasSpace(opposite, wrapperRect, popoverRect)) finalPlacement = opposite;
      else {
        const spaces = {
          top: wrapperRect.top,
          bottom: window.innerHeight - wrapperRect.bottom,
          left: wrapperRect.left,
          right: window.innerWidth - wrapperRect.right,
        };
        finalPlacement = Object.entries(spaces).sort((a, b) => b[1] - a[1])[0][0] as Placement;
      }
    }

    const coords = getCoords(finalPlacement, wrapperRect, popoverRect, align);
    setActualPlacement(finalPlacement);
    setPosition({ top: coords.top, left: coords.left });
  }, [placement]);

  useEffect(() => {
    if (!visible) return;

    updatePosition();

    /* Update position on scroll & resize */
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);
    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [visible, updatePosition]);
  /*************************
   * Portal
   *************************/
  const popoverNode = visible
    ? createPortal(
      <div
        ref={popoverRef}
        role="dialog"
        style={{ top: position.top, left: position.left, position: "absolute" }}
        className={`popover popover-${actualPlacement}`}
      >
        {children}
        <span className={`popover-arrow ${actualPlacement}`} />
      </div>,
      document.body
    )
    : null;

  return (
    <div
      ref={wrapperRef}
      style={{ display: "inline-block" }}
      className="popover-wrapper"
    >
      <div className={popoverBtnClass} onClick={togglePersist}>
        {activator}
      </div>
      {popoverNode}
    </div>
  );
});

Popover.displayName = "Popover";
export default Popover;
