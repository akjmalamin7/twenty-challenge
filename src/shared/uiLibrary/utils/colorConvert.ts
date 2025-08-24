import type { HSBType } from "./types";

/********************************
 * Clamp a value between min and max
 *********************************/
export const clamp = (val: number, min: number, max: number) => Math.min(Math.max(val, min), max);

/********************************
 * Clamp percentage between 0% and 100%
 *********************************/
export const clampPercent = (val: number) => clamp(val, 0, 100);

/********************************
 * Safe percent value to avoid 0% or 100% extremes
 *********************************/
// export const safePercent = (val: number) => Math.min(Math.max(val, 1), 99);
export const safePercent = (val: number) => clamp(val, 1, 99);

/********************************
 * Convert HSB to RGB color format
 *********************************/
export function hsbToRgb(h: number, s: number, b: number) {
  s /= 100;
  b /= 100;

  const hueSegment = (n: number) => (n + h / 60) % 6;
  const blendAmount = (n: number) => Math.max(Math.min(hueSegment(n), 4 - hueSegment(n), 1), 0);

  const channelIntensity = (n: number) => b - b * s * blendAmount(n);

  return {
    r: Math.round(channelIntensity(5) * 255),
    g: Math.round(channelIntensity(3) * 255),
    b: Math.round(channelIntensity(1) * 255),
  };
}

/********************************
 * Convert RGB to HEX format
 *********************************/
export function rgbToHex(r: number, g: number, b: number) {
  return (
    "#" +
    [r, g, b]
      .map((x) => x.toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase()
  );
}

/********************************
 * Convert HSB to HEX format
 *********************************/
export function hsbToHex(h: number, s: number, b: number) {
  const { r, g, b: blue } = hsbToRgb(h, s, b);
  return rgbToHex(r, g, blue);
}

/********************************
 * Convert HEX to RGB format
 *********************************/
export function hexToRgb(hex: string) {
  hex = hex.replace(/^#/, "");
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((c) => c + c)
      .join("");
  }
  const num = parseInt(hex.substring(0, 6), 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

/********************************
 * Convert RGB to HSB format
 *********************************/
export function rgbToHsb(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  const s = max === 0 ? 0 : (max - min) / max;
  const v = max;

  const d = max - min;
  if (max !== min) {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h *= 60;
  }

  return {
    h,
    s: s * 100,
    b: v * 100,
  };
}

export function hexToHsb(hex: string) {
  hex = hex.replace(/^#/, "");
  let r = 0,
    g = 0,
    b = 0,
    a = 1;
  if (hex.length === 6 || hex.length === 8) {
    r = parseInt(hex.slice(0, 2), 16);
    g = parseInt(hex.slice(2, 4), 16);
    b = parseInt(hex.slice(4, 6), 16);
    if (hex.length === 8) {
      a = parseInt(hex.slice(6, 8), 16) / 255;
    }
  } else {
    return null;
  }

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let h = 0;
  if (delta === 0) h = 0;
  else if (max === r) h = ((g - b) / delta) % 6;
  else if (max === g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);
  if (h < 0) h += 360;

  const s = max === 0 ? 0 : (delta / max) * 100;
  const v = (max / 255) * 100;

  return { h, s, b: v, a };
}

/********************************
 * Convert RGBA to HSB
 *********************************/
export function rgbaToHsb(rgba: string): HSBType | null {
  const match = rgba.match(/rgba?\s*\(\s*(\d+),\s*(\d+),\s*(\d+),?\s*([\d.]+)?\s*\)/i);
  if (!match) return null;

  const r = parseInt(match[1]);
  const g = parseInt(match[2]);
  const b = parseInt(match[3]);
  const a = match[4] !== undefined ? parseFloat(match[4]) : 1;

  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;

  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  const delta = max - min;

  let h = 0;
  if (delta !== 0) {
    if (max === rNorm) h = ((gNorm - bNorm) / delta) % 6;
    else if (max === gNorm) h = (bNorm - rNorm) / delta + 2;
    else h = (rNorm - gNorm) / delta + 4;
    h *= 60;
    if (h < 0) h += 360;
  }

  const s = max === 0 ? 0 : delta / max;
  const v = max;

  return {
    h: h,
    s: s * 100,
    b: v * 100,
    a: a,
  };
}

/********************************
 * Convert HSB to HEX format with alpha channel
 *********************************/
export function hsbToHexWithAlpha(h: number, s: number, b: number, a: number) {
  const { r, g, b: blue } = hsbToRgb(h, s, b);
  const hex = [r, g, blue]
    .map((x) => x.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase();
  if (a === 1) return `#${hex}`;
  const alpha = Math.round(a * 255)
    .toString(16)
    .padStart(2, "0")
    .toUpperCase();
  return `#${hex}${alpha}`;
}
