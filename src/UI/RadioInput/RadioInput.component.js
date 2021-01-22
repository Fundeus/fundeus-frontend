import React from "react";

import "./RadioInput.style.scss";

const RadioInput = (props) => {
  const { checked, label, onChange } = props;

  return (
    <div className="f-radio-input">
      <input
        id="radio"
        type="radio"
        checked={checked}
        onClick={onChange}
        onChange={onChange}
      />
      <label htmlFor="radio">{label}</label>
      <div className="check" onClick={onChange} onKeyDown={onChange} />
    </div>
  );
};

export default RadioInput;
