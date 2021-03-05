import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { TAGS } from "Constants/global.constants";

import { Button, Dropdown, CheckBox, Input } from "UI";

import "./HistoryForm.styles.scss";

const HistoryForm = (props) => {
  const { updatePatientForm, patientFormCTX, onNextButton } = props;

  const race = patientFormCTX.race;

  const highHaemoglobin = !!patientFormCTX.tags[TAGS.highHaemoglobin];
  const highBloodPressure = !!patientFormCTX.tags[TAGS.highBloodPressure];
  const inconsistentSugarBloods = !!patientFormCTX.tags[
    TAGS.inconsistentSugarBloods
  ];
  const steroids = !!patientFormCTX.tags[TAGS.steroids];
  const cigarette = !!patientFormCTX.tags[TAGS.cigarette];

  console.log(
    patientFormCTX.tags,
    highBloodPressure,
    inconsistentSugarBloods,
    steroids,
    cigarette
  );

  return (
    <div className="history-form">
      <h2>Patient History Form</h2>
      <p className="info">Fill the form or click next to skip it.</p>
      <div className="form-row">
        <div className="row-item">
          <p>Your Age:</p>
          <Input
            min="2"
            max="99"
            value={patientFormCTX.age}
            placeholder="Age"
            onChange={(event) => {
              updatePatientForm({ age: event.target.value });
            }}
            type="number"
          />
        </div>
        <div className="row-item">
          <p>Your Sex:</p>
          <Dropdown
            placeholder="Female/Male"
            options={["Female", "Male"]}
            handleSelectedOptionChange={(sex) => {
              updatePatientForm({ sex });
            }}
          />
        </div>
      </div>
      <p>
        Select one or more of the following racial categories as appropriate for
        you:
      </p>
      {["Black", "White", "Hispanic", "Other"].map((raceOption) => {
        return (
          <CheckBox
            key={raceOption}
            value={race === raceOption.toLowerCase()}
            label={raceOption}
            onChange={(event) => {
              event.preventDefault();
              updatePatientForm({ race: raceOption.toLowerCase() });
            }}
          />
        );
      })}

      <div className="break" />
      <p>Click those which apply to you:</p>
      <CheckBox
        value={highHaemoglobin}
        label="High haemoglobin A1C"
        onChange={(event) => {
          event.preventDefault();
          updatePatientForm({ tags: { 0: !highHaemoglobin } });
        }}
      />
      <CheckBox
        value={highBloodPressure}
        label="High Blood Pressure"
        onChange={(event) => {
          event.preventDefault();
          updatePatientForm({ tags: { 1: !highBloodPressure } });
        }}
      />
      <CheckBox
        value={inconsistentSugarBloods}
        label="Inconsistent blood sugar level"
        onChange={(event) => {
          event.preventDefault();
          updatePatientForm({ tags: { 2: !inconsistentSugarBloods } });
        }}
      />
      <CheckBox
        value={steroids}
        label="Long-term use of steroids"
        onChange={(event) => {
          event.preventDefault();
          updatePatientForm({ tags: { 3: !steroids } });
        }}
      />
      <CheckBox
        value={cigarette}
        label="Cigarette"
        onChange={(event) => {
          event.preventDefault();
          updatePatientForm({ tags: { 4: !cigarette } });
        }}
      />
      <Button text="Next" onClick={onNextButton} />
    </div>
  );
};

export default HistoryForm;
