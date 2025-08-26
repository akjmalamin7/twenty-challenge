import {
  allowedBreakpoints,
  type AxisOverflowProps,
  type Breakpoint,
  type OverflowProps,
  type Responsive,
  type ResponsiveRadiusProps,
  type ResponsiveRadiusSideProps,
  type ResponsiveShadowProps,
  type SpaceProps,
} from "@/shared/uiLibrary/utils/types";

/* new */
function normalizeResponsiveProps<T>(prop: Responsive<T> | T | undefined): Partial<Record<Breakpoint, T>> {
  if (prop == null) return {};
  if (typeof prop === "object") return prop;
  return { xs: prop };
}

export function getResponsiveClasses<T>(baseClass: string, prop: Responsive<T> | T | undefined): string {
  const normalized = normalizeResponsiveProps(prop);
  return Object.entries(normalized)
    .map(([breakpoint, value]) =>
      breakpoint === "xs" ? `${baseClass}--${value}` : `${breakpoint}:${baseClass}--${value}`
    )
    .join(" ");
}

/*************************
 * shadow Class Generator
 *************************/
const shadowBreakPoints: Breakpoint[] = ["xs", "sm", "md", "lg", "xl"];
export function generateShadowClasses(shadow?: ResponsiveShadowProps): string {
  if (!shadow) return "";

  const classList: string[] = [];

  if (typeof shadow === "string") {
    classList.push(`shadow--${shadow}`);
  } else {
    for (const bp of shadowBreakPoints) {
      const val = shadow[bp];
      if (val) {
        classList.push(`${bp}:shadow--${val}`);
      }
    }
  }

  return classList.join(" ");
}

/*************************
 * Overflow Class Generator
 *************************/
export function generateOverflowClasses(props?: AxisOverflowProps): string {
  if (!props) return "";

  const classList: string[] = [];

  // Case 1: Simple string or responsive object
  if (
    typeof props === "string" ||
    (typeof props === "object" && Object.keys(props).every((k) => allowedBreakpoints.includes(k as Breakpoint)))
  ) {
    const normalized = normalizeResponsive(props as OverflowProps | Responsive<OverflowProps>);
    for (const [bp, val] of Object.entries(normalized)) {
      classList.push(bp === "xs" ? `overflow--${val}` : `${bp}:overflow--${val}`);
    }
    return classList.join(" ");
  }

  // Case 2: Per-axis (x/y/all)
  const axisToClass: Record<"x" | "y" | "z", string> = {
    x: "overflow-x",
    y: "overflow-y",
    z: "overflow",
  };

  for (const axis of ["x", "y", "z"] as const) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const val = (props as Record<string, any>)[axis];
    if (!val) continue;

    const normalized = normalizeResponsive(val);
    for (const [bp, v] of Object.entries(normalized)) {
      const cls = `${axisToClass[axis]}--${v}`;
      classList.push(bp === "xs" ? cls : `${bp}:${cls}`);
    }
  }

  return classList.join(" ");
}

/*************************
 * Padding Class Generator
 *************************/

type SideValue = SpaceProps | Responsive<SpaceProps>;

const paddingBreakPoints: Breakpoint[] = ["xs", "sm", "md", "lg", "xl"];
function normalizeResponsive<T>(value: Responsive<T> | T): Partial<Record<Breakpoint, T>> {
  if (typeof value === "object" && value !== null) return value as Partial<Record<Breakpoint, T>>;
  return { xs: value as T };
}

type SideKeys = string;
export function generateMarginPaddingRadius(
  values?: SpaceProps | Responsive<SpaceProps> | Partial<Record<SideKeys, SideValue>>,
  prefix = "p",
  sides: SideKeys[] = ["top", "right", "bottom", "left", "px", "py"],
  sideToClass: Record<SideKeys, string> = {
    top: "t",
    right: "r",
    bottom: "b",
    left: "l",
    px: "x",
    py: "y",
  }
): string {
  if (!values) return "";

  const classList: string[] = [];

  if (typeof values === "number") {
    classList.push(`${prefix}--${values}`);
    return classList.join(" ");
  }

  const keys = Object.keys(values);
  const isResponsiveAll = keys.every((k) => paddingBreakPoints.includes(k as Breakpoint));

  if (isResponsiveAll) {
    const normalized = normalizeResponsive(values as Responsive<SpaceProps>);
    for (const [bp, val] of Object.entries(normalized)) {
      if (val != null) {
        classList.push(bp === "xs" ? `${prefix}--${val}` : `${bp}:${prefix}--${val}`);
      }
    }
    return classList.join(" ");
  }

  for (const side of sides) {
    const val = (values as Record<SideKeys, SideValue>)[side];
    if (val === undefined) continue;

    const classSuffix = sideToClass[side];

    if (typeof val === "number") {
      classList.push(`${prefix}${classSuffix}--${val}`);
    } else if (typeof val === "object") {
      const normalized = normalizeResponsive(val);
      for (const [bp, v] of Object.entries(normalized)) {
        if (v != null) {
          classList.push(bp === "xs" ? `${prefix}${classSuffix}--${v}` : `${bp}:${prefix}${classSuffix}--${v}`);
        }
      }
    }
  }

  return classList.join(" ");
}

/*************************
 * Radius Class Generator
 *************************/


const radiusBreakpoints: Breakpoint[] = ["xs", "sm", "md", "lg", "xl"];

export function generateRadiusClasses(
  value?: ResponsiveRadiusProps | ResponsiveRadiusSideProps,
  prefix = "rounded",
  sides: ("tl" | "tr" | "bl" | "br")[] = ["tl", "tr", "bl", "br"],
  sideToClass: Record<string, string> = {
    tl: "tl",
    tr: "tr",
    bl: "bl",
    br: "br",
  }
): string {
  if (value == null) return "";

  const classes: string[] = [];

  const isSimple =
    typeof value === "number" ||
    (typeof value === "object" && Object.keys(value).every((k) => radiusBreakpoints.includes(k as Breakpoint)));
  if (isSimple) {
    const norm = normalizeResponsive(value as ResponsiveRadiusProps);
    for (const [bp, v] of Object.entries(norm)) {
      if (v == null) continue;
      const cls = v === 0 ? `${prefix}--none` : `${prefix}${v === 50 ? "--50" : `--${v}`}`;
      classes.push(bp === "xs" ? cls : `${bp}:${cls}`);
    }
    return classes.join(" ");
  }

  const obj = value as Record<string, ResponsiveRadiusProps>;

  for (const side of sides) {
    if (!(side in obj)) continue;
    const val = obj[side];
    const norm = normalizeResponsive(val as ResponsiveRadiusProps);
    const suffix = sideToClass[side];
    for (const [bp, v] of Object.entries(norm)) {
      if (v == null) continue;
      const cls = v === 0 ? `${prefix}-${suffix}-none` : `${prefix}-${suffix}${v === 50 ? "--50" : `--${v}`}`;
      classes.push(bp === "xs" ? cls : `${bp}:${cls}`);
    }
  }

  return classes.join(" ");
}
