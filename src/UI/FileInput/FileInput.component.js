import React from "react";

import "./FileInput.style.scss";

const FileInput = (props) => {
  const { text, className: classNameFromProps, ...rest } = props;

  const handleFileChange = (event) => {
    console.log("handleFileChange", event, event.target.files);
  };

  const className = ["f-file-input", classNameFromProps]
    .filter(Boolean) // Remove falsy values from classname list to avoid redundant spaces.
    .join(" ");

  return (
    <div className={className}>
      <label>
        <input
          type="file"
          className="file-input"
          aria-label="File browser"
          onChange={handleFileChange}
        />
        <span className="file-custom"></span>
        <progress className="progress" value="25" max="100">
          25%
        </progress>
      </label>
    </div>
  );
};

export default FileInput;
