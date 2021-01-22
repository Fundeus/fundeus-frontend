import React, { useState, useEffect } from "react";
import Slider from "react-slick";

import Disease from "./Disease/Disease.component";
import "./Diseases.styles.scss";
import "./Slider.styles.scss";

import DR from "Assets/images/fundus-dr.png";
import CAT from "Assets/images/fundus-cat.png";
import GL from "Assets/images/fundus-gl.png";

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
          image={DR}
          onAction={onGetDiagnose}
        />

        <Disease
          name="Cataract"
          text="A cataract is a clouding of the eye's lens, the clear, oval-shaped structure that rests behind the pupil inside every eye. It is the most common cause of vision loss and blindness worldwide if left undiagnosed and untreated."
          image={CAT}
          onAction={onGetDiagnose}
        />
        <Disease
          name="Glaucoma"
          text="Glaucoma is an eye condition where the optic nerve, which connects the eye to the brain, becomes damaged. It's usually caused by fluid building up in the front part of the eye, which increases pressure inside the eye. It can lead to loss of vision if it's not diagnosed and treated early."
          image={GL}
          onAction={onGetDiagnose}
        />
      </Slider>
    </div>
  );
};

export default Diseases;
