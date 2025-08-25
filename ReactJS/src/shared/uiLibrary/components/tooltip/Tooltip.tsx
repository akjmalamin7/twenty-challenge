import "@/shared/uiLibrary/assets/scss/atoms/tooltip.scss";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { oppositePlacement, type Placement, type TooltipProps } from "./Tooltip.props";

const SPACING = 8;
const VIEWPORT_PADDING = 8;

const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  hoverDelay = 200,
  persistOnClick = false,
  dismissOnMouseOut = true,
  placement = "top",
  active,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const isControlled = active !== undefined;
  const [visible, setVisible] = useState<boolean>(false);
  const [persist, setPersist] = useState<boolean>(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [actualPlacement, setActualPlacement] = useState<Placement>(placement);
  const timer = useRef<NodeJS.Timeout | null>(null);

  const clearTimer = () => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  };

  useEffect(() => {
    if (isControlled) {
      setVisible(!!active);
    }
  }, [active, isControlled]);

  const showTooltip = useCallback(() => {
    if (isControlled) return;
    clearTimer();
    timer.current = setTimeout(() => setVisible(true), hoverDelay);
  }, [hoverDelay, isControlled]);

  const hideTooltip = useCallback(() => {
    if (isControlled) return;
    if (!persist && dismissOnMouseOut) {
      clearTimer();
      setVisible(false);
    }
  }, [persist, dismissOnMouseOut, isControlled]);

  const togglePersist = useCallback(() => {
    if (isControlled) return;
    if (persistOnClick) {
      setPersist((prev) => !prev);
      setVisible((prev) => !prev);
    }
  }, [persistOnClick, isControlled]);

  const hasSpace = (pos: Placement, wrapperRect: DOMRect, tooltipRect: DOMRect) => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    switch (pos) {
      case "top":
        return wrapperRect.top >= tooltipRect.height + SPACING + VIEWPORT_PADDING;
      case "bottom":
        return vh - wrapperRect.bottom >= tooltipRect.height + SPACING + VIEWPORT_PADDING;
      case "left":
        return wrapperRect.left >= tooltipRect.width + SPACING + VIEWPORT_PADDING;
      case "right":
        return vw - wrapperRect.right >= tooltipRect.width + SPACING + VIEWPORT_PADDING;
    }
  };

  const getCoords = (pos: Placement, wrapperRect: DOMRect, tooltipRect: DOMRect) => {
    switch (pos) {
      case "top":
        return {
          top: wrapperRect.top - tooltipRect.height - SPACING + window.scrollY,
          left: wrapperRect.left + wrapperRect.width / 2 - tooltipRect.width / 2 + window.scrollX,
        };
      case "bottom":
        return {
          top: wrapperRect.bottom + SPACING + window.scrollY,
          left: wrapperRect.left + wrapperRect.width / 2 - tooltipRect.width / 2 + window.scrollX,
        };
      case "left":
        return {
          top: wrapperRect.top + wrapperRect.height / 2 - tooltipRect.height / 2 + window.scrollY,
          left: wrapperRect.left - tooltipRect.width - SPACING + window.scrollX,
        };
      case "right":
        return {
          top: wrapperRect.top + wrapperRect.height / 2 - tooltipRect.height / 2 + window.scrollY,
          left: wrapperRect.right + SPACING + window.scrollX,
        };
    }
  };

  useEffect(() => {
    if (!visible) return;
    const wrapper = wrapperRef.current;
    const tooltip = tooltipRef.current;
    if (!wrapper || !tooltip) return;

    const wrapperRect = wrapper.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();

    let finalPlacement = placement;
    if (!hasSpace(finalPlacement, wrapperRect, tooltipRect)) {
      const opposite = oppositePlacement[finalPlacement];
      if (hasSpace(opposite, wrapperRect, tooltipRect)) {
        finalPlacement = opposite;
      } else {
        const spaces = {
          top: wrapperRect.top,
          bottom: window.innerHeight - wrapperRect.bottom,
          left: wrapperRect.left,
          right: window.innerWidth - wrapperRect.right,
        };
        finalPlacement = Object.entries(spaces).sort((a, b) => b[1] - a[1])[0][0] as Placement;
      }
    }

    const coords = getCoords(finalPlacement, wrapperRect, tooltipRect);
    const left = Math.min(
      Math.max(coords.left, VIEWPORT_PADDING),
      window.innerWidth - tooltipRect.width - VIEWPORT_PADDING
    );
    const top = Math.min(
      Math.max(coords.top, VIEWPORT_PADDING),
      window.innerHeight + window.scrollY - tooltipRect.height - VIEWPORT_PADDING
    );

    setActualPlacement(finalPlacement);
    setPosition({ top, left });
  }, [visible, placement]);

  useEffect(() => {
    return () => clearTimer();
  }, []);

  const tooltipNode = visible
    ? createPortal(
      <div
        ref={tooltipRef}
        role="tooltip"
        style={{ top: position.top, left: position.left }}
        className={`tooltip tooltip-${actualPlacement}`}
      >
        {content}
        <span className={`tooltip-arrow ${actualPlacement}`} />
      </div>,
      document.body
    )
    : null;

  return (
    <div
      ref={wrapperRef}
      style={{ display: "inline-block" }}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onClick={togglePersist}
    >
      {children}
      {tooltipNode}
    </div>
  );
};

export default Tooltip;
