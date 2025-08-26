import "@/shared/uiLibrary/assets/scss/atoms/range.scss";
import classNames from "classnames";
import { debounce } from "lodash";
import type React from "react";
import { forwardRef, useEffect, useMemo, useState } from "react";
import { BlockStack } from "../blockStack";
import { Input } from "../input";
import { Text } from "../text";


export interface RangeProps extends React.ComponentProps<'input'> {
  label?: string;
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  isInputField?: boolean;
  suffix?: string;
  inputFieldPosition?: "start" | "end";
  onOk?: (value: number) => void;
}

const Range = forwardRef<HTMLInputElement, RangeProps>((props, ref) => {
  const { label, value = 0, min = 0, max = 100, step, isInputField, suffix, inputFieldPosition = "row", onOk, ...rest } = props

  /*************************
   * State
   *************************/
  const [sliderRange, setSliderRange] = useState<number>(value);
  const [range, setRange] = useState<number>(value);

  /*************************
   * Handle the range change
   *************************/
  const debouncedOnOk = useMemo(() => {
    return debounce((val: number) => {
      if (typeof onOk === "function") {
        onOk(val);
      }
    }, 300);
  }, [onOk]);

  const handleRange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { valueAsNumber } = event.target;
    if (valueAsNumber > max) valueAsNumber = max;
    if (valueAsNumber < min) valueAsNumber = min
    setRange(valueAsNumber);
    debouncedOnOk(valueAsNumber);
    // typeof onOk === "function" && onOk(valueAsNumber);
  };

  /*************************
   * Calculate the slider range percentage
   *************************/
  useEffect(() => {
    const distance1 = max - min;
    const distance = range - min;
    const percentage = (distance / distance1) * 100;
    setSliderRange(percentage);
  }, [range, min, max]);


  useEffect(() => {
    return () => {
      debouncedOnOk.cancel();
    };
  }, [debouncedOnOk]);
  // `calc(${sliderRange}% - 1px)`
  const thumbPosition = sliderRange === 100 ? `calc(${sliderRange}% - 9px)` : `calc(${sliderRange}% - 1px)`
  return (
    <BlockStack className="range" gapY={30}>
      {/*************************
       * Label
       *************************/}
      {
        label && (
          <div className="range--label">
            <Text size="md" weight="regular">
              {label}
            </Text>
          </div>
        )
      }
      {/*************************
       * Slider + Input Field
       *************************/}
      <div className={classNames('range--slider-layout', { [`range--input-field--position-${inputFieldPosition}`]: inputFieldPosition })}>
        {/*************************
       *  Input Field
       *************************/}
        {
          isInputField && <div className="range--value-field">
            <Input
              size="sm"
              value={range.toString()}
              type="number"
              min={min}
              max={max}
              step={step}
              suffix={suffix as string}
              onChange={handleRange}
            />
          </div>
        }

        {/*************************
       *  Range field
       *************************/}
        <div className="range--slider">
          <input
            type="range"
            className="range--slider-field"
            onChange={handleRange}
            {...rest}
            ref={ref}
            min={min}
            max={max}
            step={step}
          />
          <div
            className='range--slider-thumb'
            style={{ left: thumbPosition }}
          ></div>
          <div
            className='range--slider-progress'
            style={{ width: `${sliderRange}% ` }}
          ></div>
        </div>
      </div>
    </BlockStack>
  )
})
export default Range;