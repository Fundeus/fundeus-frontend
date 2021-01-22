import React from "react";

import { ReactComponent as NoIcon } from "Assets/icons/no-icon.svg";

import { ReactComponent as ChevronDown } from "Assets/icons/chevron-down.svg";
import { ReactComponent as ChevronUp } from "Assets/icons/chevron-up.svg";
import { ReactComponent as ErrorIcon } from "Assets/icons/error.svg";

import { ReactComponent as FileDrag } from "Assets/icons/file-drag.svg";

// import { ReactComponent as FileTrash } from "Assets/icons/files/trash.svg";

import "./Icon.style.scss";

// Colors: white, purple-main, gray-3, gray-4

const ICONS = {
  Default: NoIcon,

  "chevron-down": ChevronDown,
  "chevron-up": ChevronUp,
  error: ErrorIcon,
  "file-drag": FileDrag,
};

const Icon = (props) => {
  const {
    className: classNameFromProps,
    color,
    name,
    onClick,
    hoverText,
    small,
    ...rest
  } = props;

  const IconComponent = ICONS[name] || ICONS.Default;
  const className = [
    "f-icon",
    classNameFromProps,
    name,
    color,
    small && "small",
    onClick && "clickable",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <IconComponent
      title={name}
      className={className}
      onClick={onClick}
      {...rest}
    />
  );
};

export default Icon;
