import React from "react";

import "./Checkbox.style.scss";

const Checkbox = (props) => {
  const { value, onChange, label } = props;

  return (
    <label className="f-field-checkbox" onClick={onChange}>
      {label}
      <input
        type="checkbox"
        checked={value}
        onChange={(event) => event.stopPropagation()}
      />
      <span className="checkmark"></span>
    </label>
  );
};

export default Checkbox;
