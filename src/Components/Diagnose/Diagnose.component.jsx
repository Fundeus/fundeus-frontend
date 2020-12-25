import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { Loader } from "UI";
import { diagnoseAPI, getResultsAPI } from "Actions/diagnose.actions";
import DR from "Assets/images/fundus-01.jpg";

import "./Diagnose.styles.scss";

const DiagnosisDetail = (props) => {
  const { disaese, result, active } = props;
  return (
    <div className={`diagnosis-detail ${active ? "active" : ""}`}>
      <h2>
        {active ? "" : "Not "}
        {disaese}
      </h2>
      <p>{result}%</p>
    </div>
  );
};

const DISAEASE_DETAILS = {
  cataract: "",
  glaucoma: "",
  diabeticRetinopathy:
    "Diabetic retinopathy is a complication of diabetes, caused by high blood sugar levels damaging the back of the eye (retina). It can cause blindness if left undiagnosed and untreated.",
};

const RESULTS = ["Healthy", "Cataract", "Glaucoma", "Diabetic Retinopathy"];

const Diagnose = (props) => {
  const { diagnose, match } = props;

  const hash = match.params.result_hash;

  useEffect(() => {
    props.getResultsAPI(hash);
  }, []);

  if (!diagnose.getResultsCTX.data) {
    return <Loader big />;
  }

  const resultData = diagnose.getResultsCTX.data;

  const resultType = resultData.attributes.results;
  let result = 0;
  if (resultType.cat && parseInt(resultType.cat, 10) == 1) {
    result = 1;
  } else if (resultType.gl && parseInt(resultType.gl, 10) == 0) {
    result = 2;
  } else if (resultType.dr && parseInt(resultType.dr, 10) == 0) {
    result = 3;
  }
  const mostLikely = RESULTS[result];
  console.log(
    parseInt(resultType.cat, 10),
    parseInt(resultType.gl, 10),
    parseInt(resultType.dr, 10),
    result
  );

  console.log(props, hash);
  return (
    <div className="diagnose-container">
      {/* <Loader big /> */}
      <img alt="Fundus Img" className="diesase-img" src={DR} />
      <div className="results">
        <p>You are most likely to be</p>
        <h1>{mostLikely}</h1>
        <div className="result-details">
          <DiagnosisDetail
            disaese="Cataract"
            result="83"
            active={result === 1}
          />
          <DiagnosisDetail
            disaese="Glaucoma"
            result="73"
            active={result === 2}
          />
          <DiagnosisDetail
            disaese="Diabetic Retinopathy"
            result="70"
            active={result === 3}
          />
        </div>
        <p>
          {DISAEASE_DETAILS.diabeticRetinopathy}
          <span> Learn More </span>
        </p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    diagnose: state.diagnose,
  };
};

const actionCreators = {
  getResultsAPI,
};

export default connect(mapStateToProps, actionCreators)(Diagnose);
