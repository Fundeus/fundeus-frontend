import React from "react";

import "./LinkButton.style.scss";

const LinkButton = (props) => {
  const { text, className: classNameFromProps, ...rest } = props;

  const className = ["f-link-button", classNameFromProps]
    .filter(Boolean) // Remove falsy values from classname list to avoid redundant spaces.
    .join(" ");

  return (
    <a className={className} type="button" {...rest}>
      {text}
    </a>
  );
};

export default LinkButton;
