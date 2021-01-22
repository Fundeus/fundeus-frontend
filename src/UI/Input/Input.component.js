import React from "react";

import "./Input.style.scss";

const Input = (props) => {
  const {
    label,
    disabled,
    placeholder,
    inputValue,
    value,
    onChange,
    onIconClick,
    icon,
    centered,
    white,
    big,
    hasError,
    errorText,
    className,
    inputRef,
    ...rest
  } = props;

  const inputClassName = [
    "f-input",
    className,
    hasError && "error",
    (icon || hasError) && "iconed",
    white && "white",
    centered && "centered",
    big && "big",
  ]
    .filter((e) => e)
    .join(" ");

  const inputFieldValue = inputValue !== undefined ? inputValue : value;

  return (
    <div className="f-input">
      <div className="input-wrapper">
        <span className="label">{label}</span>
        <div className="input-line">
          <input
            ref={inputRef}
            className={inputClassName}
            disabled={disabled}
            placeholder={placeholder}
            value={inputFieldValue}
            onChange={onChange}
            {...rest}
          />
        </div>
        {hasError && <div className="error-wrapper-mobile">{errorText}</div>}
      </div>
    </div>
  );
};

export default Input;
