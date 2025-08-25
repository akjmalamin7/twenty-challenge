import { getResponsiveClasses } from "@/shared/uiLibrary//utils/dynamicClass";
import "@/shared/uiLibrary/assets/scss/atoms/phone.scss";
import classNames from "classnames";
import _ from "lodash";
import { type ChangeEvent, forwardRef, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "../button";
import { SoppiyaIcon } from "../soppiyaIcon";
import { Spinner } from "../spinner";
import { Text } from "../text";
import type { CountrySchema, PhoneProps } from "./Phone.props";

const SPACING = 8;
const VIEWPORT_PADDING = 8;


const Phone = forwardRef<HTMLInputElement, PhoneProps>((props, ref) => {
  const { size = "md", label, helpText, error, flagPosition = "left", dropdown, value, countries, loading, disabled, readOnly, onChange, onValid, onBlur, onFocus, ...rest } = props;

  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownButtonRef = useRef<HTMLButtonElement | null>(null);
  const fieldWrapperRef = useRef<HTMLDivElement>(null);

  const [toggle, setToggle] = useState<boolean>(false)
  const [menuPosition, setMenuPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const [menuPlacement, setMenuPlacement] = useState<"top" | "bottom" | "left" | "right">("bottom")

  const [input, setInput] = useState<string>("");
  const [unformattedNumber, setUnformattedNumber] = useState<string>("");
  const [isValidate, setIsValidate] = useState<boolean>(false)
  const [selectedCountry, setSelectedCountry] = useState<CountrySchema>({
    _id: "",
    flag: "",
    name: "",
    phone: {
      _id: "",
      dialing_code: "",
      format: ""
    }
  })
  const [countryList, setCountryList] = useState<Array<CountrySchema>>([])



  /* change country */
  const handleChangeCountry = (countryId: string) => {
    const findCountry = countryList.find(item => item._id === countryId);
    if (!findCountry) return;
    setSelectedCountry(findCountry);
    setInput(findCountry.phone.dialing_code)
    setToggle(false)
  }

  const handlePastePopulate = (value: string, numberFormat: string) => {
    const escapeChar = [" ", "(", ")"];
    const number = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    let inputs = value.split("");
    let format = numberFormat.split("");
    let returnStr = "";

    while (inputs.length) {
      if (format[0] == inputs[0]) {
        returnStr += inputs[0];
      } else if (escapeChar.includes(format[0])) {
        inputs = `${format[0]}${inputs.join("")}`.split("");
        continue;
      } else if (format[0] === "X" && number.includes(inputs[0])) {
        returnStr += inputs[0];
      } else break;
      inputs = inputs.slice(1);
      format = format.slice(1)
    }

    const formateRawInput = numberFormat.replace(/[\s()-]/g, "");
    const newRawInput = value.replace(/[\s()-]/g, "");

    let isValidated = false;

    if (formateRawInput.length == newRawInput.length) {
      isValidated = true
    } else if (newRawInput.length === 0) {
      isValidated = true;
    } else {
      isValidated = false;
    }

    return {
      formattedNumber: returnStr,
      newUnformattedNumber: newRawInput,
      isValidated
    }

  }

  const handleFormatOnChange = (value: string, numberFormat: string) => {
    const escapeChar = [" ", "(", ")"];
    const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const formateRawInput = numberFormat.replace(/[\s()-]/g, "");

    let returnNumberString = "";
    value.split("").forEach((char, index) => {
      let devient = 0;
      if (escapeChar.includes(numberFormat[index])) {
        returnNumberString += numberFormat[index];
        devient = 1;
      }
      if (numberFormat[index + devient] == "X" && numbers.includes(char)) {
        returnNumberString += char;
      } else if (numberFormat[index + devient] == char) {
        returnNumberString += char
      }
    })

    const newRawInput = returnNumberString.replace(/[\s()-]/g, "");
    let isValidated = false;
    if (formateRawInput.length == newRawInput.length) {
      isValidated = true;
    } else if (newRawInput.length === 0) {
      isValidated = true;
    } else {
      isValidated = false
    }

    return {
      formattedNumber: returnNumberString,
      newUnformattedNumber: newRawInput,
      isValidated
    }
  }


  const handleRemoveInput = (value: string, numberFormat: string) => {
    const escapeChar = [" ", "(", ")"];
    if (escapeChar.includes(value[value.length - 1])) {
      value = value.slice(0, value.length - 1)
    }

    const formateRawInput = numberFormat.replace(/[\s()-]/g, "");
    const newRawInput = value.replace(/[\s()-]/g, "");
    let isValidated = false;

    if (formateRawInput.length == newRawInput.length) {
      isValidated = true;
    } else if (newRawInput.length === 0) {
      isValidated = true;
    } else {
      isValidated = false;
    }
    return {
      formattedNumber: value,
      newUnformattedNumber: newRawInput,
      isValidated
    }
  }


  const formatNumber = (numberFormat: string, value: string) => {
    if (unformattedNumber < value.replace(/[\s()-]/g, "")) {
      if (unformattedNumber.length == value.replace(/[\s()-]/g, "").length - 1) {
        const getData = handleFormatOnChange(value, numberFormat);
        setUnformattedNumber(getData.newUnformattedNumber);
        setIsValidate(getData.isValidated);
        setInput(getData.formattedNumber);
        return getData;
      } else {
        const getData = handlePastePopulate(value, numberFormat);
        setUnformattedNumber(getData.newUnformattedNumber);
        setIsValidate(getData.isValidated);
        setInput(getData.formattedNumber);
        return getData;
      }
    } else {
      const getData = handleRemoveInput(value, numberFormat);
      setUnformattedNumber(getData.newUnformattedNumber);
      setIsValidate(getData.isValidated);
      setInput(getData.formattedNumber);
      return getData;
    }
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value: string = event.target.value;
    const { newUnformattedNumber, isValidated } = formatNumber(
      selectedCountry.phone.format,
      value
    );

    if (_.isFunction(onChange)) {
      onChange({
        phone: newUnformattedNumber,
        country: selectedCountry._id,
      });
    }

    if (_.isFunction(onValid)) {
      onValid(isValidated);
    }
  };


  useEffect(() => {
    if (countries && countries.length) {
      setCountryList(countries as Array<CountrySchema>);
    }
  }, [countries])


  useEffect(() => {
    if (countryList.length) {
      let targetContry;
      if (value) {
        targetContry = countryList.find((country) => country?._id === value.country) || countryList[0];
      } else {
        targetContry = countryList[0]
      }
      if (value?.country) {
        const findCountry = countryList.find(country => country._id === value.country)
        if (findCountry) {
          targetContry = findCountry;
        }
      }
      setSelectedCountry(targetContry);

      if (value?.phone) {
        const { formattedNumber, newUnformattedNumber, isValidated } = handlePastePopulate(value.phone, targetContry.phone.format)
        onValid?.(!isValidated);
        setInput(formattedNumber);
        setUnformattedNumber(newUnformattedNumber);
        setIsValidate(isValidated)
      } else {
        onValid?.(true)
        setIsValidate(true)
      }
    }

  }, [countryList, value])


  const handleToggle = () => {
    if (readOnly || disabled) return;
    setToggle((prev) => !prev);
  };

  useEffect(() => {
    if (!toggle) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      const isInsideDropdown = dropdownRef.current?.contains(target);
      const isInsideButton = dropdownButtonRef.current?.contains(target);
      const isInsideInput =
        (ref as React.RefObject<HTMLInputElement>)?.current?.contains(target);

      if (!isInsideDropdown && !isInsideButton && !isInsideInput) {
        setToggle(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggle]);
  {/************************* *
  *  Calculate dropdown position
  * *************************/}
  const calculateMenuPosition = () => {
    if (!dropdownButtonRef.current || !dropdownRef.current || !fieldWrapperRef.current) return;

    const btnRect = dropdownButtonRef.current.getBoundingClientRect();
    const menuRect = dropdownRef.current.getBoundingClientRect();
    const wrapperRect = fieldWrapperRef.current.getBoundingClientRect();

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const padding = VIEWPORT_PADDING;

    const spaceBelow = vh - btnRect.bottom;
    let top = 0;
    let left = btnRect.left + window.scrollX;
    let placement: "top" | "bottom" = "bottom";

    if (spaceBelow >= menuRect.height + SPACING + padding) {
      top = btnRect.bottom + SPACING + window.scrollY - 6;
      placement = 'bottom'
    } else {
      top = btnRect.top - menuRect.height - SPACING - padding;
      placement = "top"
    }
    left = Math.min(Math.max(left, padding), vw - menuRect.width - padding);
    setMenuPlacement(placement);
    setMenuPosition({ top, left })

    if (dropdownRef.current) {
      dropdownRef.current.style.width = `${wrapperRect.width}px`;
    }
  }
  useEffect(() => {
    if (!toggle) return;
    calculateMenuPosition();
    window.addEventListener("resize", calculateMenuPosition)
    window.addEventListener("scroll", calculateMenuPosition)

    return () => {
      window.removeEventListener("resize", calculateMenuPosition)
      window.removeEventListener("scroll", calculateMenuPosition)
    }
  }, [toggle])
  {/************************* *
  *  Classes
  * *************************/}
  const phoneFlagPosition = classNames('phone--field-wrapper', { [`phone--flag-position-${flagPosition}`]: flagPosition });
  const phoneFlagBoxClasses = classNames('phone--flag-box', getResponsiveClasses('phone', size))
  const phoneFieldBoxClasses = classNames('phone--field-box', getResponsiveClasses('phone', size))
  const phoneFieldClasses = classNames('phone--field', { 'phone--field-error': error?.status, 'phone--field-disabled': disabled, 'phobne--filed-readonly': readOnly })

  return (
    <div className="phone">
      {/************************* *
       *  Label and Label action text
       * *************************/}
      {
        label && (
          <div className="phone--label">
            {label && (
              <label className="phone--label-text">
                <Text size="md" weight="regular" color="primary">
                  {label}
                </Text>
              </label>
            )}
          </div>
        )
      }
      {/************************* *
       *  field
       * *************************/}
      <div className={phoneFlagPosition} ref={fieldWrapperRef}>
        <div className={phoneFlagBoxClasses}>
          <Button
            className="phone--flag-button"
            size={size} onClick={handleToggle}
            ref={dropdownButtonRef}

          >
            {
              loading ? <Spinner /> : (<>
                <img src={selectedCountry.flag} alt={selectedCountry.name} />
                <SoppiyaIcon icon="stepper.svg" size="sm" />
              </>)
            }
          </Button>
        </div>
        <div className={phoneFieldBoxClasses} valid-phobe={isValidate ? "valid" : "invalid"}>
          {
            loading ? <div className="phone--filed-loader">
              <Spinner />
            </div> : <input
              className={phoneFieldClasses}
              type="text"
              ref={ref}
              {...rest}
              value={input}
              disabled={disabled}
              readOnly={readOnly}
              placeholder={selectedCountry.phone.format}
              onChange={handleInputChange}
              onBlur={onBlur}
              onFocus={onFocus}
            />
          }
        </div>
      </div>
      {/************************* *
         *  Help text
         * *************************/}
      {helpText && (
        <div className="phone--help-message">
          <Text size="sm" weight="regular" color="tertiary">
            {helpText || ''}
          </Text>
        </div>
      )}
      {/************************* *
       *  Error
       * *************************/}
      {!!error?.status && (
        <div className="otp--error-message">
          <Text size="sm" weight="regular" color="danger">
            {error?.message || ''}
          </Text>
        </div>
      )}
      {/************************* *
       *  Dropdown
       * *************************/}
      <>
        {!loading && dropdown && toggle ? createPortal(<div
          className="phone--flag-dropdown"
          ref={dropdownRef}
          style={{
            position: "absolute",
            top: menuPosition.top,
            left: menuPosition.left,
            zIndex: 99,
            pointerEvents: "auto",
            minWidth: "200px",
            maxHeight: "250px"
          }}
          menu-position={menuPlacement}
        >
          <ul>
            {
              countryList && countryList.map((country) => (
                <li key={country._id} onClick={() => handleChangeCountry(country._id)}>
                  <Text as="span">
                    <img style={{ width: "24px" }} src={country.flag} alt={country.name} />
                  </Text>
                  <Text size="md" >
                    {country.name}
                  </Text>
                  <Text size="md" >
                    ({country.phone.dialing_code})
                  </Text>
                </li>
              ))
            }
          </ul>
        </div>, document.body) : null}
      </>
    </div >
  );
});
Phone.displayName = "Phone"
export default Phone;