import React, { useState, useEffect } from "react";

import Diseases from "Components/Diseases/Diseases.component";

import "./Home.styles.scss";

const Diagnose = (props) => {
  return (
    <div className="home-container">
      <Diseases />
    </div>
  );
};

export default Diagnose;
