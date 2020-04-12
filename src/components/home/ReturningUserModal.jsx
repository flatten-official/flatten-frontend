import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { submitForm } from "../../actions/index";
import Modal from "../common/modal/Modal";
import ReturningUserForm from "./ReturningUserForm";

const ReturningUserModal = ({ onClose }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const dispatch = useDispatch();

  const handleReturningUserSubmit = (values) => {
    dispatch(submitForm(values));
    setFormSubmitted(true);
  };
  return (
    <Modal className="returning-user" onClose={onClose}>
      <div className="returning-user__title title">
        {!formSubmitted
          ? "Returning user?"
          : "Please check your email for a verification code."}
      </div>

      {!formSubmitted && (
        <ReturningUserForm onSubmit={handleReturningUserSubmit} />
      )}
    </Modal>
  );
};

export default ReturningUserModal;
