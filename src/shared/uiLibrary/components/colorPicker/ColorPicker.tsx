import { CrossLineIcon } from "@/shared/uiLibrary/assets/icons/crossLineIcon";
import "@/shared/uiLibrary/assets/scss/atoms/colorPicker.scss";
import {
  clamp,
  clampPercent,
  hexToHsb,
  hsbToHexWithAlpha,
  hsbToRgb,
  rgbaToHsb,
  safePercent,
} from "@/shared/uiLibrary/utils/colorConvert";
import { useEffect, useRef, useState } from "react";
import { Button } from "../button";

export interface ColorStop {
  color: string;
  position: string;
}
export type HSBType = {
  h: number; // Hue: 0 থেকে 360 ডিগ্রি
  s: number; // Saturation: 0 থেকে 100 শতাংশ
  b: number; // Brightness: 0 থেকে 100 শতাংশ
  a: number; // Alpha (opacity): 0 থেকে 1 (optional)
};

export interface ColorPickerProps {
  // Accepts various color values as props
  hexValue?: string;
  rgbaValue?: string;
  linearValue?: string;
  radialValue?: string;
  // Optional className for styling
  className?: string;
  // Callback functions for value changes
  onChange?: (color: string) => void;
  onHexChange?: (value: string) => void;
  onRgbaChange?: (value: string) => void;
  onLinearChange?: (value: string) => void;
  onRadialChange?: (value: string) => void;
  // Callback functions for value changes
  showHexField?: boolean;
  showRgbaField?: boolean;
  showLinearField?: boolean;
  showRadialField?: boolean;
  showAngleField?: boolean;
  showGradientStops?: boolean;
}

export type ActiveInputType = "hex" | "rgba" | "linear" | "radial" | null;

const ColorPicker = ({
  hexValue,
  rgbaValue,
  linearValue,
  radialValue,
  className,
  onChange,
  onHexChange,
  onRgbaChange,
  onLinearChange,
  onRadialChange,
  showHexField = true,
  showRgbaField = false,
  showLinearField = false,
  showRadialField = false,
  showAngleField = false,
  showGradientStops = false,
}: ColorPickerProps) => {
  /********************************
   * States
   *********************************/
  // Core HSB + Alpha color state
  // Initializing hsb state based on hexValue or default
  // const [hsb, setHSB] = useState({ h: 300, s: 100, b: 100, a: 1 });

  const [hsb, setHSB] = useState(() => {
    if (hexValue) {
      const hsbFromHex = hexToHsb(hexValue);
      if (hsbFromHex) return hsbFromHex;
    }
    return { h: 300, s: 100, b: 100, a: 1 };
  });

  //Sync hsb when hexValue prop changes from outside
  const prevHsbRef = useRef<HSBType | null>(null);
  const areHsbEqual = (a: HSBType, b: HSBType) => {
    const precision = 0.5;
    return (
      Math.abs(a.h - b.h) < precision &&
      Math.abs(a.s - b.s) < precision &&
      Math.abs(a.b - b.b) < precision &&
      Math.abs((a.a ?? 1) - (b.a ?? 1)) < 0.01
    );
  };

  // Add this useRef at the top
  const pendingHsbRef = useRef<HSBType | null>(null);
  const lastUpdatedRef = useRef<HSBType>(hsb);

  useEffect(() => {
    if (!hexValue) return;

    const hsbFromHex = hexToHsb(hexValue);
    if (!hsbFromHex) return;

    if (!areHsbEqual(hsb, hsbFromHex)) {
      setHSB(hsbFromHex);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hexValue]);

  // Input states for various formats
  const [hexInput, setHexInput] = useState(hexValue || hsbToHexWithAlpha(hsb.h, hsb.s, hsb.b, hsb.a));
  const [rgbaInput, setRgbaInput] = useState(rgbaValue || "");
  const [linearInput, setLinearInput] = useState(linearValue || "");
  const [radialInput, setRadialInput] = useState(radialValue || "");
  const [activeInput, setActiveInput] = useState<ActiveInputType>(null);

  // Gradient-specific states
  const [gradientAngle, setGradientAngle] = useState(90);
  const [gradientStops, setGradientStops] = useState<ColorStop[]>([]);

  // References for color UI elements
  const colorAreaRef = useRef<HTMLDivElement>(null);
  const hueRef = useRef<HTMLDivElement>(null);
  const alphaRef = useRef<HTMLDivElement>(null);

  // Updates all color values and triggers change handlers
  const [isDraggingSB, setIsDraggingSB] = useState(false);
  const [isDraggingHue, setIsDraggingHue] = useState(false);
  const [isDraggingAlpha, setIsDraggingAlpha] = useState(false);

  // Dragging flags for mouse interactions
  const prevHexValueRef = useRef(hexValue);

  useEffect(() => {
    prevHexValueRef.current = hexValue;
  }, [hexValue]);

  const updateValues = (updated: HSBType) => {
    if (prevHsbRef.current && areHsbEqual(prevHsbRef.current, updated)) {
      return;
    }
    prevHsbRef.current = updated;

    const hex = hsbToHexWithAlpha(updated.h, updated.s, updated.b, updated.a ?? 1);
    const { r, g, b } = hsbToRgb(updated.h, updated.s, updated.b);
    const rgba = `rgba(${r}, ${g}, ${b}, ${(updated.a ?? 1).toFixed(2)})`;

    let finalStops: string[];
    if (showGradientStops && gradientStops.length > 0) {
      finalStops = gradientStops.map((s) => {
        const updatedColor = s.color.includes("rgba")
          ? `rgba(${r}, ${g}, ${b}, ${(updated.a ?? 1).toFixed(2)})`
          : s.color;
        return `${updatedColor} ${s.position}`;
      });
    } else {
      finalStops = [`${rgba} 0%`, "rgba(255,255,255,1) 100%"];
    }

    const linear = `linear-gradient(${gradientAngle}deg, ${finalStops.join(", ")})`;
    const radial = `radial-gradient(circle, ${finalStops.join(", ")})`;

    if (hex !== hexInput) setHexInput(hex);
    if (rgba !== rgbaInput) setRgbaInput(rgba);

    if (linear !== linearInput) setLinearInput(linear);

    if (radial !== radialInput) setRadialInput(radial);

    // only fire callbacks when values changed
    if (hex !== hexValue) onHexChange?.(hex);
    if (rgba !== rgbaValue) onRgbaChange?.(rgba);
    if (linear !== linearValue) onLinearChange?.(linear);
    if (radial !== radialValue) onRadialChange?.(radial);
    onChange?.(hex);
  };

  useEffect(() => {
    if (gradientStops.length === 0) return;

    const { r, g, b } = hsbToRgb(hsb.h, hsb.s, hsb.b);
    const a = hsb.a ?? 1;
    const updatedStops = gradientStops.map((stop) => {
      return {
        color: `rgba(${r}, ${g}, ${b}, ${a.toFixed(2)})`,
        position: stop.position,
      };
    });

    setGradientStops(updatedStops);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hsb]);

  // Updates Saturation and Brightness using mouse position
  const updateSaturationBrightness = (clientX: number, clientY: number) => {
    if (!colorAreaRef.current) return;
    const rect = colorAreaRef.current.getBoundingClientRect();
    const x = clamp(clientX - rect.left, 0, rect.width);
    const y = clamp(clientY - rect.top, 0, rect.height);
    const s = (x / rect.width) * 100;
    const b = 100 - (y / rect.height) * 100;
    const newHSB = { ...hsb, s, b };
    setHSB(newHSB);
    pendingHsbRef.current = newHSB;
  };

  // Updates Hue slider value based on Y coordinate
  const updateHue = (clientY: number) => {
    if (!hueRef.current) return;
    const rect = hueRef.current.getBoundingClientRect();
    const y = clamp(clientY - rect.top, 0, rect.height);
    const h = ((rect.height - y) / rect.height) * 360;
    const newHSB = { ...hsb, h };
    setHSB(newHSB);
    pendingHsbRef.current = newHSB;
  };

  const updateAlpha = (clientY: number) => {
    if (!alphaRef.current) return;
    const rect = alphaRef.current.getBoundingClientRect();
    const y = clamp(clientY - rect.top, 0, rect.height);
    const a = 1 - y / rect.height;
    // setHSB(prev => ({ ...prev, a }));
    const newHSB = { ...hsb, a };
    setHSB(newHSB);
    pendingHsbRef.current = newHSB;
  };
  // Syncs all color-related values when HSB or gradient changes

  useEffect(() => {
    if (isDraggingSB || isDraggingHue || isDraggingAlpha) return;

    if (!areHsbEqual(hsb, lastUpdatedRef.current)) {
      updateValues(hsb);
      lastUpdatedRef.current = hsb;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hsb, gradientAngle, gradientStops, isDraggingSB, isDraggingHue, isDraggingAlpha]);

  // Global mouse event listeners for dragging support
  useEffect(() => {
    const handleMove = (x: number, y: number) => {
      if (isDraggingSB) updateSaturationBrightness(x, y);
      if (isDraggingHue) updateHue(y);
      if (isDraggingAlpha) updateAlpha(y);
    };

    const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const stopDragging = () => {
      setIsDraggingSB(false);
      setIsDraggingHue(false);
      setIsDraggingAlpha(false);

      // Commit the final value after drag ends
      if (pendingHsbRef.current) {
        updateValues(pendingHsbRef.current);
        lastUpdatedRef.current = pendingHsbRef.current;
        pendingHsbRef.current = null;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", stopDragging);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", stopDragging);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", stopDragging);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", stopDragging);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDraggingSB, isDraggingHue, isDraggingAlpha]);

  // Adds a new color stop to the gradient
  const addGradientStop = () => {
    const { r, g, b } = hsbToRgb(hsb.h, hsb.s, hsb.b);
    const rgba = `rgba(${r}, ${g}, ${b}, ${hsb.a.toFixed(2)})`;
    setGradientStops((prev) => [...prev, { color: rgba, position: "50%" }]);
  };

  // Updates color value of specific stop
  const updateStopColor = (index: number, color: string) => {
    setGradientStops((prev) => {
      const updated = [...prev];
      updated[index].color = color;
      return updated;
    });
    updateValues(hsb);
  };

  // Updates position value of specific stop
  const updateStopPosition = (index: number, position: string) => {
    setGradientStops((prev) => {
      const updated = [...prev];
      updated[index].position = position;
      return updated;
    });
    updateValues(hsb);
  };

  useEffect(() => {
    if (!showLinearField && !showGradientStops) return;

    const stops =
      gradientStops.length > 0
        ? gradientStops.map((s) => `${s.color} ${s.position}`)
        : [`rgba(${r},${g},${b},${hsb.a.toFixed(2)}) 0%`, "rgba(255,255,255,1) 100%"];

    const newLinear = `linear-gradient(${gradientAngle}deg, ${stops.join(", ")})`;

    if (newLinear !== linearInput) {
      setLinearInput(newLinear);
      onLinearChange?.(newLinear);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gradientStops, gradientAngle]);

  // Removes a color stop by index
  const removeGradientStop = (index: number) => {
    setGradientStops((prev) => prev.filter((_, i) => i !== index));
  };

  const { r, g, b } = hsbToRgb(hsb.h, hsb.s, hsb.b);
  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setActiveInput("hex");
    const val = e.target.value;
    setHexInput(val);
    const hsbFromHex = hexToHsb(val);
    if (hsbFromHex) {
      setHSB(hsbFromHex);
    }
  };

  const handleRgbaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setActiveInput("rgba");
    setRgbaInput(val);

    const hsbFromRgba = rgbaToHsb(val);
    if (hsbFromRgba) {
      setHSB(hsbFromRgba);
    }
  };

  const handleLinearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setActiveInput("linear");

    const val = e.target.value;
    setLinearInput(val);
    onLinearChange?.(val);

    const match = val.match(/^linear-gradient\(([^,]+),\s*(.+)\)$/);
    if (match) {
      const anglePart = match[1];
      const stopsPart = match[2];

      const degMatch = anglePart.trim().match(/(\d+)(deg)?/);
      if (degMatch) {
        setGradientAngle(Number(degMatch[1]));
      }

      const stops = stopsPart.split(/,(?![^()]*\))/).map((s) => s.trim());

      const parsedStops = stops.map((stop) => {
        const lastSpace = stop.lastIndexOf(" ");
        return {
          color: stop.slice(0, lastSpace),
          position: stop.slice(lastSpace + 1),
        };
      });

      setGradientStops(parsedStops);
    }
  };

  const handleRadialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setActiveInput("radial");
    const val = e.target.value;
    setRadialInput(val);
  };

  useEffect(() => {
    if (activeInput !== "hex") {
      const hex = hsbToHexWithAlpha(hsb.h, hsb.s, hsb.b, hsb.a);
      if (hex !== hexInput) setHexInput(hex);
    }

    if (activeInput !== "rgba") {
      const { r, g, b } = hsbToRgb(hsb.h, hsb.s, hsb.b);
      const rgba = `rgba(${r}, ${g}, ${b}, ${hsb.a.toFixed(2)})`;
      if (rgba !== rgbaInput) setRgbaInput(rgba);
    }

    if (activeInput !== "linear") {
      const { r, g, b } = hsbToRgb(hsb.h, hsb.s, hsb.b);
      const a = hsb.a.toFixed(2);

      const stops =
        gradientStops.length > 0
          ? gradientStops.map((s) => `${s.color} ${s.position}`)
          : [`rgba(${r},${g},${b},${a}) 0%`, "rgba(255,255,255,1) 100%"];

      const linear = `linear-gradient(${gradientAngle}deg, ${stops.join(", ")})`;

      if (linear !== linearInput) setLinearInput(linear);
    }

    if (activeInput !== "radial") {
      const { r, g, b } = hsbToRgb(hsb.h, hsb.s, hsb.b);
      const a = hsb.a.toFixed(2);

      const stops =
        gradientStops.length > 0
          ? gradientStops.map((s) => `${s.color} ${s.position}`)
          : [`rgba(${r},${g},${b},${a}) 0%`, "rgba(255,255,255,1) 100%"];

      const radial = `radial-gradient(circle, ${stops.join(", ")})`;

      if (radial !== radialInput) setRadialInput(radial);
    }
  }, [hsb, activeInput, hexInput, rgbaInput, linearInput, radialInput, gradientStops, gradientAngle]);

  return (
    <div className={`color-picker ${className || ""}`}>
      {/********************************
       * Color picker plate (SB plane)
       *********************************/}
      <div
        className="main-color"
        ref={colorAreaRef}
        onMouseDown={(e) => {
          setIsDraggingSB(true);
          updateSaturationBrightness(e.clientX, e.clientY);
        }}
        onTouchStart={(e) => {
          setIsDraggingSB(true);
          updateSaturationBrightness(e.touches[0].clientX, e.touches[0].clientY);
        }}
        style={{ backgroundColor: `hsl(${hsb.h}, 100%, 50%)` }}
      >
        <div className="white-gradient" />
        <div className="black-gradient" />
        <div
          className="dragger"
          style={{
            left: `${safePercent(hsb.s)}%`,
            top: `${safePercent(100 - hsb.b)}%`,
          }}
        />
      </div>

      {/********************************
       * Hue vertical slider
       *********************************/}
      <div
        className="slider hue"
        ref={hueRef}
        onMouseDown={(e) => {
          setIsDraggingHue(true);
          updateHue(e.clientY);
        }}
        onTouchStart={(e) => {
          setIsDraggingHue(true);
          updateHue(e.touches[0].clientY);
        }}
      >
        <div className="dragger" style={{ top: `${clampPercent(100 - (hsb.h / 360) * 100)}%` }} />
      </div>

      {/********************************
       * Alpha (transparency) vertical slider
       *********************************/}
      <div
        className="slider alpha"
        ref={alphaRef}
        onMouseDown={(e) => {
          setIsDraggingAlpha(true);
          updateAlpha(e.clientY);
        }}
        onTouchStart={(e) => {
          setIsDraggingAlpha(true);
          updateAlpha(e.touches[0].clientY);
        }}
        style={{
          backgroundImage: `linear-gradient(to top, rgba(${r},${g},${b},0), rgba(${r},${g},${b},1))`,
        }}
      >
        {/********************************
         * Color picker Dragger
         *********************************/}
        <div className="dragger" style={{ top: `${clampPercent((1 - hsb.a) * 100)}%` }} />
      </div>

      {/********************************
       * Input fields for color formats
       *********************************/}
      <div className="color-picker--color-field--group">
        {/* RGB Field */}
        {showHexField && (
          <input
            className="color-picker--color-field"
            value={hexInput}
            onChange={handleHexChange}
            placeholder="Hex with alpha"
          />
        )}
        {/* Linear Gradient Field */}
        {showRgbaField && <input value={rgbaInput} onChange={handleRgbaChange} placeholder="RGBA" />}

        {/* Radial Gradient Field */}
        {showLinearField && <input value={linearInput} onChange={handleLinearChange} placeholder="Linear Gradient" />}
        {/* Radial Gradient Field */}
        {showRadialField && <input value={radialInput} onChange={handleRadialChange} placeholder="Radial Gradient" />}
        {/* Angle Field */}
        {showAngleField && (
          <input
            type="number"
            value={gradientAngle}
            onChange={(e) => setGradientAngle(Number(e.target.value))}
            placeholder="Angle (deg)"
          />
        )}
        {/* Gradient Stops Field and Close Button*/}
        {showGradientStops &&
          gradientStops.map((stop, idx) => (
            <div className="color-picker--stops-group" key={idx}>
              <input
                type="text"
                value={stop.color}
                onChange={(e) => updateStopColor(idx, e.target.value)}
                placeholder="rgba(...)"
                className="color-picker--stops-item"
              />
              <input
                type="text"
                value={stop.position}
                onChange={(e) => updateStopPosition(idx, e.target.value)}
                placeholder="e.g. 50%"
                className="color-picker--stops-ratio"
              />
              <Button
                size="sm"
                color="secondary"
                className="color-picker--stops-close"
                onClick={() => removeGradientStop(idx)}
              >
                <CrossLineIcon />
              </Button>
            </div>
          ))}
      </div>

      {/***************************
       * Add Stop & Reset Buttons
       ****************************/}
      <div className="color-picker--add-reset--button">
        {/***************************
         *  Add stops button
         ****************************/}
        {showGradientStops && (
          <div className="color-picker--gradient-stop-button">
            <Button size="sm" onClick={addGradientStop} color="secondary">
              + Add Gradient Stop
            </Button>
          </div>
        )}

        {/***************************
         *  Add Reset button
         ****************************/}
        <div className="color-picker--reset-button">
          <Button
            size="sm"
            onClick={() => {
              setHSB({ h: 300, s: 100, b: 100, a: 1 });
              setGradientStops([]);
              setGradientAngle(90);
            }}
            color="secondary"
          >
            Reset Color
          </Button>
        </div>
      </div>
    </div>
  );
};
export default ColorPicker;
