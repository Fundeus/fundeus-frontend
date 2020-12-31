import React, { useState, useEffect } from "react";

import Berkay from "Assets/images/us/berkay.png";
import Berk from "Assets/images/us/berk.png";
import Tanalp from "Assets/images/us/tanalp.png";

import "./About.styles.scss";

const Person = (props) => {
  const { image, name, department } = props;
  return (
    <div className="person-container">
      <img src={image} />
      <p>
        {name}
        <br />
        {department}
      </p>
    </div>
  );
};

const About = (props) => {
  return (
    <div className="about-container">
      <div className="about-info">
        <h1>About Us</h1>
        <p>
          The Fundeus project aims to diagnose a cataract, glaucoma, and
          diabetic retinopathy using fundus images by a machine learning-based
          interactive system. In detail, we proposed a decision support system
          that is easy to use, benefiting from several machine learning
          algorithms in the background. Machine learning and deep learning
          algorithms such as Neural Network, Resnet, gradient boost trained, and
          tested with publicly available datasets such as Messidor and EyePACS.
        </p>
      </div>
      <div className="about-us">
        <div className="about-us-line">
          <Person name="Berkay Barlas" department="CE & EE" image={Berkay} />
          <Person
            name="Salih Berk Dınçer"
            department="MAVA & EE"
            image={Berk}
          />
        </div>
        <div className="about-us-line">
          <Person name="Tanalp Şengün" department="BA & EE" image={Tanalp} />
        </div>
      </div>
    </div>
  );
};

export default About;
