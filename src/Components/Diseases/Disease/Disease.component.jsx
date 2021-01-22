import React, { useState, useEffect } from "react";

import { Button } from "UI";

import "./Disease.styles.scss";

const Diseases = (props) => {
  const { name, image, text, onAction } = props;
  return (
    <div className="disease">
      <div className="diesase-info">
        <h1>{name}</h1>
        <p>{text}</p>
        <div className="diesase-action">
          <Button text="Get Diagnosed" onClick={onAction} />
        </div>
      </div>
      <img alt="Fundeus Logo" className="diesase-img" src={image} />
    </div>
  );
};

export default Diseases;
