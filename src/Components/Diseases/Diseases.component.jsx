import React, { useState, useEffect } from "react";

import Disease from "./Disease/Disease.component";

const Diseases = (props) => {
  return (
    <div className="diseases-container">
      <Disease
        name="Diabetic Retinopathy"
        text="Massimo Vignelli è stato un grafico e designer italiano. 
Nel corso della sua lunghissima carriera, sempre affiancato 
dalla moglie Lella, Massimo Vignelli si è occupato di svariati 
rami del design."
        image="DR"
      />
    </div>
  );
};

export default Diseases;
