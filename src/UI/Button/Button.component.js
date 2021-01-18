import React from "react";

import "./Button.style.scss";

const Button = (props) => {
  const {
    disabled,
    errorText,
    big,
    block,
    icon,
    text,
    white,
    gray,
    basic,
    blue,
    breath,
    className: classNameFromProps,
    ...rest
  } = props;

  const className = [
    "f-button",
    classNameFromProps,
    big && "big",
    block && "block",
    gray && "gray",
    white && "white",
    basic && "basic",
    blue && "blue",
    breath && "breath",
    disabled && "disabled",
  ]
    .filter(Boolean) // Remove falsy values from classname list to avoid redundant spaces.
    .join(" ");

  return (
    <>
      <button className={className} type="button" disabled={disabled} {...rest}>
        {text}
      </button>
    </>
  );
};

export default Button;
