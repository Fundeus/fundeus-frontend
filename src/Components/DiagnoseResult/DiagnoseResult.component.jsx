import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { Loader, Button } from "UI";
import { diagnoseAPI, getResultsAPI } from "Actions/diagnose.actions";
import { GetHistoryResults, GetReferences } from "./HistoryRiskCalculator.js";

import "./DiagnoseResult.styles.scss";
import routes from "Constants/route.constants";

const DISAEASE_DETAILS = {
  0: "Fundeus shouldn't be solely used for treatment without consulting an ophthalmologist. The system is best for use as a decision support system.",
  1: "Cataract is a clouding of the eye's lens, the clear, oval-shaped structure that rests behind the pupil inside every eye.",
  2: "Glaucoma is an eye condition where the optic nerve, which connects the eye to the brain, becomes damaged.",
  3: "Diabetic retinopathy is a complication of diabetes caused by high blood sugar levels damaging the back of the eye (retina).",
};

const LEARN_MORE_LINKS = {
  1: "https://www.nhs.uk/conditions/cataracts/",
  2: "https://www.nhs.uk/conditions/glaucoma/",
  3: "https://www.nhs.uk/conditions/diabetic-retinopathy",
};

const RESULTS = [
  "Healthy",
  "Cataract",
  "Glaucoma",
  "Diabetic Retinopathy",
  "Fundus Images",
];

const DiagnosisDetail = (props) => {
  const { disaese, result, active } = props;
  return (
    <div className={`diagnosis-detail ${active ? "active" : ""}`}>
      <h2>{disaese}</h2>
      <p>{result}%</p>
    </div>
  );
};

const DiagnoseResult = (props) => {
  const { diagnose, match, history } = props;

  const hash = match.params.result_hash;

  useEffect(() => {
    props.getResultsAPI(hash);
  }, []);

  if (!diagnose.getResultsCTX.data) {
    return (
      <div className="diagnose-pending">
        <Loader big />
        <p>
          It might take 40 seconds for ML servers to turn on and predict results
          if they are not used for a long time.
        </p>
      </div>
    );
  }

  const resultData = diagnose.getResultsCTX.data;
  const resultType = resultData.attributes.results;

  const { age, sex, race, tags } = resultData.attributes.history_form;

  let cat = Math.max(parseInt(resultType.cat * 100, 10), 0);
  let gl = Math.max(parseInt(resultType.gl * 100, 10), 0);
  let dr = Math.max(parseInt(resultType.dr * 100, 10), 0);

  const maxVal = _.max([cat, gl, dr]);

  let result = 0;
  const isFundusImage = resultType.fundus;
  if (maxVal <= 55) {
    result = 0;
  } else if (cat === maxVal) {
    result = 1;
  } else if (gl === maxVal) {
    result = 2;
  } else if (dr === maxVal) {
    result = 3;
  }
  if (cat === 0) cat = maxVal % 7;
  if (gl === 0) gl = maxVal % 7;
  if (dr === 0) dr = maxVal % 7;

  const historyResults = GetHistoryResults(age, sex, race, tags, result);

  const mostLikely = RESULTS[result];

  console.log(cat, gl, dr, result);

  console.log(props, hash, isFundusImage);
  return (
    <div className="diagnose-results-container">
      {/* <Loader big /> */}
      <div className="img-container">
        <img
          alt="Image uploaded by user"
          className="diesase-img"
          src={resultData.attributes.image_url}
        />
      </div>
      {isFundusImage ? (
        <div className="results">
          <p>You are most likely to be</p>
          <h1>{mostLikely}</h1>
          <div className="result-details">
            <DiagnosisDetail
              disaese="Cataract"
              result={cat}
              active={result === 1}
            />
            <DiagnosisDetail
              disaese="Glaucoma"
              result={gl}
              active={result === 2}
            />
            <DiagnosisDetail
              disaese="Diabetic Retinopathy"
              result={dr}
              active={result === 3}
            />
          </div>
          <p>
            {DISAEASE_DETAILS[result]}
            {result > 0 && (
              <a href={LEARN_MORE_LINKS[result]} target="_blank">
                Learn More >
              </a>
            )}
          </p>
          {result > 0 && historyResults.length > 0 && (
            <div className="history-form-results">
              <h3>
                Due to the following facts you are most likely to be{" "}
                {RESULTS[result]}:
              </h3>
              {historyResults.map((result) => (
                <p>{result}</p>
              ))}
              <div className="references">{GetReferences(tags, result)}</div>
            </div>
          )}
        </div>
      ) : (
        <div className="results not-fundus">
          <p>Nice try, but the system only accepts</p>
          <h1>Fundus Images</h1>
          <div className="info-text">
            <p>
              This is an eye diseases diagnosing system; therefore, The image
              you uploaded should be a Fundus Image, so please upload one.
            </p>
          </div>
          <Button
            text="Get Diagnosed"
            onClick={() => history.push(routes.getDiagnosed)}
          />
        </div>
      )}
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

export default connect(mapStateToProps, actionCreators)(DiagnoseResult);
