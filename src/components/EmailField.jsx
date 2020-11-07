import React from "react";
import PropTypes from "prop-types";
import { validate } from "isemail";

import FormField from "./FormField";

const EmailField = (props) => {
  // prevent passing type and validator props from this component to the rendered form field component
  const { type, clearMe, validator, ...restProps } = props;

  // validateEmail function using the validate() method of the isemail package
  const validateEmail = (value) => {
    if (!validate(value, { minDomainAtoms: 2 }))
      throw new Error("Email is invalid");
  };

  // pass the validateEmail to the validator prop
  return (
    <FormField
      type="text"
      test={clearMe}
      validator={validateEmail}
      {...restProps}
    />
  );
};

EmailField.propTypes = {
  label: PropTypes.string.isRequired,
  fieldId: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  required: PropTypes.bool,
  children: PropTypes.node,
  onStateChanged: PropTypes.func,
  clearMe: PropTypes.string,
};

export default EmailField;
