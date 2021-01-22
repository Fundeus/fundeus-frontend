import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import AWS from "aws-sdk";

import { TextButton, Input, Icon } from "UI";

import {
  diagnoseAPI,
  getResultsAPI,
  updatePatientForm,
  getRandomFundusImages,
} from "Actions/diagnose.actions";
import { REQUEST_STATUS } from "Constants/global.constants";

import HistoryForm from "./HistoryForm.component";
import "./Diagnose.styles.scss";

// PUT THIS LOGIC TO BACKEND, NOT A GOOD PRACTICE
AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
});

const AWS_BUCKET_NAME = process.env.REACT_APP_AWS_S3_IMAGE_BUCKET_NAME;
const AWS_BUCKET_REGION = process.env.REACT_APP_AWS_S3_IMAGE_BUCKET_REGION;

const S3Bucket = new AWS.S3({
  params: { Bucket: process.env.REACT_APP_AWS_S3_IMAGE_BUCKET_NAME },
  region: process.env.REACT_APP_AWS_S3_IMAGE_BUCKET_REGION,
});

const BUCKET_URL = `https://${AWS_BUCKET_NAME}.s3-${AWS_BUCKET_REGION}.amazonaws.com/`;

const uuid = () => {
  return "xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const ExampleImage = (props) => {
  const { image, form, diagnoseAPI } = props;
  return (
    <img
      className="example-image"
      src={image}
      onClick={() => diagnoseAPI(image, form)}
    />
  );
};

const Diagnose = (props) => {
  const {
    diagnose,
    diagnoseAPI,
    updatePatientForm,
    getRandomFundusImages,
    history,
  } = props;

  const [inputURL, setInputURL] = useState("");
  const [isDragActive, setIsDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [currentPage, setCurrentPage] = useState("form");

  useEffect(() => {
    getRandomFundusImages(3);
  }, []);

  useEffect(() => {
    if (diagnose.DiagnoseCTX.status === REQUEST_STATUS.SUCCESS) {
      const hash = diagnose.DiagnoseCTX.data.attributes.result_hash;
      setTimeout(() => {
        history.push("/diagnosis-results/" + hash);
      }, 100);
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

  const onFileInput = (event) => {
    event.preventDefault();
    fileInput(event.target.files);
  };

  const handleDrop = (event) => {
    event.preventDefault();

    console.log("event", event.dataTransfer, event.target);

    fileInput(event.dataTransfer.files);

    if (isDragActive) {
      setIsDragActive(false);
    }
  };

  const fileInput = (files) => {
    if (files.length > 1) {
      // Error
      return;
    }
    const file = files[0];
    if (file && file.type.includes("image")) {
      console.log("fileInput", file);
      uploadFile(file);
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
    return !!pattern.test(inputURL);
  };

  const uploadFile = (file) => {
    const fileName = uuid() + file.name;

    const imageUrl = BUCKET_URL + fileName;
    console.log(imageUrl);

    const params = {
      ACL: "public-read",
      Key: fileName,
      ContentType: "application/octet-stream",
      Body: file,
    };
    S3Bucket.putObject(params)
      .on("httpUploadProgress", (evt) => {
        // that's how you can keep track of your upload progress
        console.log(evt.loaded / evt.total, evt);
        setUploadProgress(Math.round((evt.loaded / evt.total) * 100));
      })
      .send((err, data) => {
        console.log("err", err, data);
        if (!err) {
          getResults(imageUrl);
        }
      });

    return fileName;
  };

  const getResults = (imageUrl) => {
    if (diagnose.DiagnoseCTX.status !== REQUEST_STATUS.PENDING) {
      diagnoseAPI(imageUrl, diagnose.patientFormCTX);
    }
  };

  if (currentPage === "form") {
    return (
      <HistoryForm
        updatePatientForm={updatePatientForm}
        patientFormCTX={diagnose.patientFormCTX}
        onNextButton={() => setCurrentPage("image-upload")}
      />
    );
  }

  return (
    <div
      className="diagnose-container"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <>
        <h1>Upload your fundus image</h1>
        <div className="file-input-wrapper">
          <label>
            <input
              type="file"
              className="file-input"
              aria-label="File browser"
              onChange={onFileInput}
            />
            <div
              className={`file-drag-drop ${isDragActive ? "file-dragged" : ""}`}
            >
              <Icon name="file-drag" />
              <p>Drag your fundus image here or browse</p>
            </div>
          </label>
          {uploadProgress > 0 && (
            <div class="meter animate">
              <span style={{ width: `${uploadProgress}%` }}></span>
              <p>{uploadProgress}%</p>
            </div>
          )}
          <div className="url-input">
            <Input
              value={inputURL}
              placeholder="www.imgur.com/123"
              onChange={(event) => {
                setInputURL(event.target.value);
              }}
              onBlur={() => {
                if (checkInputURL()) getResults(inputURL);
              }}
            />
            {/* <Button
                text="Diagnose"
                onClick={() => {
                  if (checkInputURL()) props.diagnoseAPI(inputURL);
                }}
                disabled={inputURL === ""}
              /> */}
          </div>
        </div>
        <h2>Or choose an image to test</h2>
        <div className="pre-selected-images">
          {diagnose.fundusImagesCTX.selectedImages.map((url) => (
            <ExampleImage
              key={url}
              diagnoseAPI={diagnoseAPI}
              form={diagnose.patientFormCTX}
              image={url}
              history={history}
            />
          ))}
        </div>
        <TextButton
          text="Get different Images"
          onClick={() => getRandomFundusImages(3)}
        />
      </>
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
  updatePatientForm,
  getRandomFundusImages,
};

export default connect(mapStateToProps, actionCreators)(Diagnose);
