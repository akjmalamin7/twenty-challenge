import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
const SPACING = 8;
const VIEWPORT_PADDING = 8;
export type AlignPopover = "start" | "end";
export type Placement = "top" | "bottom" | "left" | "right";
const OppositePlacement: Record<Placement, Placement> = {
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left",
};
interface PopoverProps {
  activator?: React.ReactNode;
  children?: React.ReactNode;
  popoverBtnClass?: string;
  placement?: Placement;
  align?: AlignPopover
  active?: boolean;
}
const DynamicDropdown = ({ activator, children, popoverBtnClass, placement = "bottom", align, active }: PopoverProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const popoverRef = useRef<HTMLDivElement>(null)
  const isControlled = active !== undefined;
  const [visible, setVisible] = useState<boolean>(false)
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [actualPlacement, setActualPlacement] = useState<Placement>(placement)

  useEffect(() => {
    if (isControlled) setVisible(!!active)
  }, [active, isControlled]);

  const handleVisible = useCallback(() => {
    if (isControlled) return;
    setVisible(prev => !prev)
  }, [isControlled])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node) &&
        wrapperRef.current && !wrapperRef.current.contains(e.target as Node)
      ) {
        setVisible(false)
      }
    }
    if (visible) document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [visible])

  const hasSpace = (pos: Placement, wrapperRect: DOMRect, popoverRect: DOMRect) => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    switch (pos) {
      case "top": return wrapperRect.top >= popoverRect.height + SPACING + VIEWPORT_PADDING;
      case "bottom": return vh - wrapperRect.bottom >= popoverRect.height + SPACING + VIEWPORT_PADDING;
      case "left": return wrapperRect.left >= popoverRect.width + SPACING + VIEWPORT_PADDING
      case "right": return vw - wrapperRect.right >= popoverRect.width + SPACING + VIEWPORT_PADDING;
    }
  }

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

        if (align === "end") {
          left = wrapperRect.right - popoverRect.width + window.scrollX;

          if (left < VIEWPORT_PADDING) {
            left = wrapperRect.left + window.scrollX;
          }
        } else {
          left = wrapperRect.left + window.scrollX;

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

  const handleUpdatePosition = useCallback(() => {
    const wrapper = wrapperRef.current;
    const popover = popoverRef.current;

    if (!popover || !wrapper) return;

    const wrapperRect = wrapper.getBoundingClientRect()
    const popoverRect = popover.getBoundingClientRect()

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
        }
        finalPlacement = Object.entries(spaces).sort((a, b) => b[1] - a[1])[0][0] as Placement
      }
    }
    // hasSpace(finalPlacement, wrapperRect, popoverRect)
    const coords = getCoords(finalPlacement, wrapperRect, popoverRect, align ?? "start");

    setActualPlacement(finalPlacement);
    setPosition({ top: coords.top, left: coords.left });
  }, [align, placement]);
  useEffect(() => {
    if (!visible) return;

    handleUpdatePosition()

    window.addEventListener("scroll", handleUpdatePosition)
    window.addEventListener("resize", handleUpdatePosition)

    return () => {
      window.removeEventListener("scroll", handleUpdatePosition)
      window.removeEventListener("resize", handleUpdatePosition)
    }

  }, [visible, handleUpdatePosition])

  const portalNode = visible ? createPortal(<div
    ref={popoverRef}
    style={{ position: "absolute", left: `${position.left}px`, top: `${position.top}px` }}
    className={`w-[max-content] bg-gray-100 rounded-md overflow-hidden popover popover-${actualPlacement}`}
  >
    {
      children
    }

  </div>, document.body) : null;
  return (
    <>

      <div ref={wrapperRef} className="w-[max-content]">
        <div className="">
          {
            activator ? <div onClick={handleVisible}>{activator}</div> : <button className={`${popoverBtnClass} bg-gray-100 h-[36px] px-[15px] text-gray-950 rounded-sm lg:cursor-pointer`} onClick={handleVisible} >Dropdown</button>
          }

        </div>
        {
          portalNode
        }
      </div>

    </>
  );
};
export default DynamicDropdown;