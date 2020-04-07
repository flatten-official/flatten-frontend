import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { submit } from "redux-form";
import { submitForm } from "../../actions/index";
import PrimaryButton from "../common/buttons/PrimaryButton";
import SymptomsForm, { symptomsFormName } from "./SymptomsForm";
import SubmitModal from "./SubmitModal";
import SyringeIcon from "../../assets/syringe.svg";

const TrackYourSymptoms = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const handleClick = async () => {
    dispatch(submit(symptomsFormName));
  }

  const handleSubmit = values => {
    setShowModal(true);
    dispatch(submitForm(values));
  }

  return (
    <div className="symptoms">
      <div className="symptoms__header">
        <div className="symptoms__title">
          <div className="title">Tell us how you feel!</div>
          <SyringeIcon className="symptoms__syringe-icon"/>
        </div>
        <p className="symptoms__description body">
          Your answers will be collected and shared anonymously through our heatmap to help
          healthcare providers, researchers, and community members gauge the spread of COVID-19.
          The questionnaire is based on the best available guidance from Canadian public health
          agencies, and is designed to collect information regarding your risk factors for
          COVID-19. It is not intended to facilitate any kind of diagnosis or self-assessment for 
          COVID-19. If you suspect you may have COVID-19, please seek a medical professional. See
          our Terms of Service and Privacy Policy for more information.
        </p>
        <p className="symptoms__description body">
          <b>Please fill in this form even if you are experiencing no symptoms.</b>
        </p>
      </div>
      <SymptomsForm onSubmit={handleSubmit}/>
      <div className="symptoms__submit">
        <PrimaryButton
          className="symptoms__submit-button"
          onClick={handleClick}
        >
          Submit
        </PrimaryButton>
      </div>
      {showModal && (
        <SubmitModal onClose={() => setShowModal(false)}/>
      )}
    </div>
  );
};

export default TrackYourSymptoms;
