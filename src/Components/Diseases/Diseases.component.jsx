import React, { useState, useEffect } from "react";
import Slider from "react-slick";

import Disease from "./Disease/Disease.component";
import "./Diseases.styles.scss";
import "./Slider.styles.scss";

const slideSettings = {
  dots: false,
  infinite: true,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const Diseases = (props) => {
  const { onGetDiagnose } = props;
  return (
    <div className="diseases-container">
      <Slider {...slideSettings}>
        <Disease
          name="Diabetic Retinopathy"
          text="Diabetic retinopathy is a complication of diabetes, caused by high blood sugar levels damaging the back of the eye (retina). 
        It can cause blindness if left undiagnosed and untreated."
          image="DR"
          onAction={onGetDiagnose}
        />

        <Disease
          name="Cataract"
          text="Diabetic retinopathy is a complication of diabetes, caused by high blood sugar levels damaging the back of the eye (retina). 
        It can cause blindness if left undiagnosed and untreated."
          image="DR"
          onAction={onGetDiagnose}
        />
        <Disease
          name="Glaucoma"
          text="Diabetic retinopathy is a complication of diabetes, caused by high blood sugar levels damaging the back of the eye (retina). 
        It can cause blindness if left undiagnosed and untreated."
          image="DR"
          onAction={onGetDiagnose}
        />
      </Slider>
    </div>
  );
};

export default Diseases;
