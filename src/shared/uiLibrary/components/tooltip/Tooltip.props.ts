export type Placement = "top" | "bottom" | "left" | "right";

export const oppositePlacement: Record<Placement, Placement> = {
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left",
};

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  hoverDelay?: number;
  persistOnClick?: boolean;
  dismissOnMouseOut?: boolean;
  placement?: Placement;
  active?: boolean;
}
