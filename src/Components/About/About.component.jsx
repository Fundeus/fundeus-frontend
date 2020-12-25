import React, { useState, useEffect } from "react";

const About = (props) => {
  return (
    <div className="cbout-container">
      The Fundeus project aims to diagnose a cataract, glaucoma, and diabetic
      retinopathy using fundus images by a machine learning-based interactive
      system. In detail, we proposed a decision support system that is easy to
      use, benefiting from several machine learning algorithms in the
      background. Machine learning and deep learning algorithms such as Neural
      Network, Resnet, gradient boost trained, and tested with publicly
      available datasets such as Messidor and EyePACS.
    </div>
  );
};

export default About;
