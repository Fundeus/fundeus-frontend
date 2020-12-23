import React, { useState, useEffect } from "react";

import { Button } from "UI";

import "./Disease.styles.scss";
import DR from "Assets/images/fundus-01.jpg";

const Diseases = (props) => {
  const { name, image, text } = props;
  return (
    <div className="disease">
      <div className="diesase-info">
        <h1>{name}</h1>
        <p>{text}</p>
        <div className="diesase-action">
          <Button text="Get Diagnosed" />
        </div>
      </div>
      <img alt="Fundeus Logo" className="diesase-img" src={DR} />
    </div>
  );
};

export default Diseases;
