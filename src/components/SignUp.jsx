import React, { Component } from "react";
import LockIcon from "@material-ui/icons/Lock";
import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import CloseIcon from "@material-ui/icons/Close";
import axios from "axios";

import FormField from "./FormField";
import EmailField from "./EmailField";
import PasswordField from "./PasswordField";
import Button from "./Button";

class SignUp extends Component {
  constructor(props) {
    super(props);
    // initialize state to hold validity of form fields

    this.state = {
      firstname: "",
      lastName: "",
      email: "",
      password: "",
      open: false,
      message: "",
      errorcolor: false,
    };

    // higher-order function that returns a state change watch function
    // sets the corresponding state property to it's value if the form field has no errors
    this.fieldStateChanged = (field) => (state) =>
      this.setState({ [field]: state.value });

    // state change watch functions for each fields
    this.emailChanged = this.fieldStateChanged("email");
    this.firstnameChanged = this.fieldStateChanged("firstname");
    this.passwordChanged = this.fieldStateChanged("password");
    this.lastNameChanged = this.fieldStateChanged("lastName");
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    axios({
      method: "post",
      url: "https://api.raisely.com/v3/check-user",
      data: {
        campaignUuid: "46aa3270-d2ee-11ea-a9f0-e9a68ccff42a",
        data: {
          email: this.state.email,
        },
      },
    }).then((response) => {
      if (response.statusText === "OK" || response.status === 200) {
        axios({
          method: "post",
          url: "https://api.raisely.com/v3/signup",
          data: {
            campaignUuid: "46aa3270-d2ee-11ea-a9f0-e9a68ccff42a",
            data: {
              firstName: this.state.firstname,
              lastName: this.state.lastName,
              email: this.state.email,
              password: this.state.password,
            },
          },
        })
          .then((res) => {
            if (res.status === 200) {
              this.setState({
                firstname: "",
                lastName: "",
                email: "",
                password: "",
                open: true,
                message: res.data.message,
              });
            }
          })
          .catch((err) => {
            let emailErr = err.response.data.errors[0].message;
            this.setState({ open: true, message: emailErr, errorcolor: true });
          });
      }
    });
  };

  render() {
    const {
      firstname,
      lastName,
      email,
      password,
      message,
      errorcolor,
    } = this.state;
    const formValidated = firstname && lastName && email && password;

    // validation function for the firstname
    // ensures that firstname contains at least name.
    const validateFirstName = (value) => {
      const regex = /^[a-zA-Z0-9_.-]{2,}$/i;
      if (!regex.test(value)) throw new Error("FirstName is invalid");
    };

    // validation function for the lastname
    // ensures that lastname contains at least name.
    const validateLastName = (value) => {
      const regex = /^[a-zA-Z0-9_.-]{2,}$/i;
      if (!regex.test(value)) throw new Error("LastName is invalid");
    };

    return (
      <div className="form-container d-table-cell position-relative align-middle">
        <form method="POST" noValidate>
          <div className="d-flex flex-row justify-content-between align-items-center px-3 mb-5">
            <legend className="form-label mb-0">
              Raisely SignUp Form <LockIcon />
            </legend>
            {/** Show the form button only if all fields are valid **/}
            {formValidated && (
              <Button
                buttonIcon={<LockIcon />}
                start={true}
                type="submit"
                click={this.handleSubmit}
              />
            )}
          </div>

          <Collapse in={this.state.open} style={{ marginBottom: "10px" }}>
            <Alert
              color={errorcolor ? "error" : "success"}
              action={
                <IconButton
                  aria-label="close"
                  color={errorcolor ? "secondary" : "inherit"}
                  size="small"
                  onClick={() => {
                    this.setState({ open: false });
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              {message}
            </Alert>
          </Collapse>

          <div className="py-5 border-gray border-top border-bottom">
            {/** Render the firstname form field passing the name validation fn **/}
            <FormField
              type="text"
              fieldId="firstname"
              label="First Name"
              placeholder="Enter First Name"
              validator={validateFirstName}
              onStateChanged={this.firstnameChanged}
              test={this.state.firstname}
              required
            />
            {/** Render the lastname form field passing the name validation fn **/}
            <FormField
              type="text"
              fieldId="lastName"
              label="Last Name"
              placeholder="Your Last Name"
              validator={validateLastName}
              onStateChanged={this.lastNameChanged}
              test={this.state.lastName}
              required
            />

            {/** Render the email field component **/}
            <EmailField
              fieldId="email"
              label="Email"
              placeholder="Enter Email Address"
              onStateChanged={this.emailChanged}
              clearMe={this.state.email}
              required
            />

            {/** Render the password field component using thresholdLength of 7 and minStrength of 3 **/}
            <PasswordField
              fieldId="password"
              label="Password"
              placeholder="Enter Password"
              onStateChanged={this.passwordChanged}
              thresholdLength={7}
              minStrength={3}
              clearMe={this.state.password}
              required
            />
          </div>
        </form>
      </div>
    );
  }
}

export default SignUp;
