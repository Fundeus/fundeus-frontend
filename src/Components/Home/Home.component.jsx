import React, { useState, useEffect } from "react";

import Diseases from "Components/Diseases/Diseases.component";

import "./Home.styles.scss";
import routes from "Constants/route.constants";

const Home = (props) => {
  const { history } = props;

  const handleGetDiagnose = (event) => {
    history.push(routes.getDiagnosed);
  };

  return (
    <div className="home-container">
      <Diseases onGetDiagnose={handleGetDiagnose} />
    </div>
  );
};

export default Home;
