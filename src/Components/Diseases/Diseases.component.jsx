import React, { useState, useEffect } from "react";

import Disease from "./Disease/Disease.component";

const Diseases = (props) => {
  const { onGetDiagnose } = props;
  return (
    <div className="diseases-container">
      <Disease
        name="Diabetic Retinopathy"
        text="Diabetic retinopathy is a complication of diabetes, caused by high blood sugar levels damaging the back of the eye (retina). 
        It can cause blindness if left undiagnosed and untreated."
        image="DR"
        onAction={onGetDiagnose}
      />
    </div>
  );
};

export default Diseases;
