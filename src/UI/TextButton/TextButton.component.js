import React from "react";

import "./TextButton.style.scss";

const TextButton = (props) => {
  const { text, color, className: classNameFromProps, ...rest } = props;

  const className = ["f-text-button", classNameFromProps, color]
    .filter(Boolean) // Remove falsy values from classname list to avoid redundant spaces.
    .join(" ");

  return (
    <button className={className} type="button" {...rest}>
      {text}
    </button>
  );
};

export default TextButton;
