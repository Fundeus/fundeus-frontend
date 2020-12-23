import React, { useState } from "react";

import { FileInput } from "UI";

import "./Concept.styles.scss";

const Concept = (props) => {
  const [isDragActive, setIsDragActive] = useState(false);

  const handleDragOver = (event) => {
    console.log("onDragOver");
    event.preventDefault();
    if (!isDragActive) {
      setIsDragActive(true);
    }
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    if (isDragActive) {
      setIsDragActive(false);
    }
  };

  const handleDrop = (event) => {
    console.log("handleDrop", event.dataTransfer.files);
    event.preventDefault();

    // onFileDrop(event);

    if (isDragActive) {
      setIsDragActive(false);
    }
  };

  return (
    <div
      className="concept-container"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <h1>Upload</h1>
      <div className="file-input-wrapper">
        <div className={`file-drag-drop ${isDragActive ? "file-dragged" : ""}`}>
          <p>Drag & Drop</p>
        </div>
        <FileInput />
      </div>
    </div>
  );
};

export default Concept;
