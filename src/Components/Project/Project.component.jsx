import React, { useState, useEffect } from "react";

import Berkay from "Assets/images/us/berkay.png";
import Berk from "Assets/images/us/berk.png";
import Tanalp from "Assets/images/us/tanalp.png";

import "./Project.styles.scss";

const Project = (props) => {
  return (
    <div className="project-container">
      <div className="project-info">
        <h1>Project</h1>
        <p>
          The challenge of this project was to develop a machine learning
          algorithm in 14 weeks that will be used in cataract, glaucoma, and
          diabetic retinopathy diagnosis as a decision support system by an
          Ophthalmologist. The decision support system is an interactive website
          that enhances its ease of usage. Users are able to get detailed
          diagnostic reports by uploading a fundus image to the website, with
          the algorithm’s accuracy rate. Also, using an additional
          patient-demographic form that asks sex, race and background
          informations we aimed to give further personalized information about
          the prediction.
        </p>
      </div>
      <div className="video-container">
        <iframe
          width="760"
          height="315"
          src="https://www.youtube.com/embed/N3AqG7vH0zU"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen="true"
        />
      </div>
      <div className="about-us"></div>
    </div>
  );
};

export default Project;
