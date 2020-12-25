import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { FileInput, Button, Input, Loader } from "UI";

import "./Concept.styles.scss";

import { diagnoseAPI, getResultsAPI } from "Actions/diagnose.actions";
import { REQUEST_STATUS } from "Constants/global.constants";

const Concept = (props) => {
  const { diagnose, history } = props;

  const [inputURL, setInputURL] = useState("");
  const [isDragActive, setIsDragActive] = useState(false);

  useEffect(() => {
    if (diagnose.DiagnoseCTX.status === REQUEST_STATUS.SUCCESS) {
      const hash = diagnose.DiagnoseCTX.data.attributes.result_hash;
      setTimeout(() => {
        history.push("/diagnosis-results/" + hash);
      }, 2000);
    }
  }, [diagnose.DiagnoseCTX.status]);

  const handleDragOver = (event) => {
    event.preventDefault();
    if (!isDragActive) {
      setIsDragActive(true);
    }
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    if (isDragActive) {
      setIsDragActive(false);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();

    // onFileDrop(event);

    if (isDragActive) {
      setIsDragActive(false);
    }
  };

  const checkInputURL = () => {
    const pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    // return !!pattern.test(inputURL);
    return true;
  };

  return (
    <div
      className="concept-container"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {diagnose.DiagnoseCTX.status !== REQUEST_STATUS.SUCCESS ? (
        <>
          <h1>Upload</h1>
          <div className="file-input-wrapper">
            <div
              className={`file-drag-drop ${isDragActive ? "file-dragged" : ""}`}
            >
              <p>Drag & Drop</p>
            </div>
            <FileInput />
            <div>
              <Input
                value={inputURL}
                onChange={(event) => {
                  setInputURL(event.target.value);
                }}
              />
              <Button
                text="Diagnose"
                onClick={() => {
                  if (checkInputURL()) props.diagnoseAPI(inputURL);
                }}
                disabled={inputURL === ""}
              />
            </div>
          </div>
        </>
      ) : (
        <Loader big />
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
  diagnoseAPI,
  getResultsAPI,
};

export default connect(mapStateToProps, actionCreators)(Concept);
